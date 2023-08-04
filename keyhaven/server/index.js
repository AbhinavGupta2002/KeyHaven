const express = require('express')
const cors = require('cors')
const pg = require('pg')
const tables = require('./tables.js')
const {responses, emailContentBuilder} = require('./functionLibrary.js')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const scheduler = require('node-schedule')
const mailer = require('nodemailer')
const cookieParser = require('cookie-parser')
const Cookies = require('universal-cookie')
const crypto = require('crypto')

const app = express()
dotenv.config()
const connectionString = process.env.CONNECTION_STRING

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));

let client = new pg.Client(connectionString)
const cryptoAlgorithm = 'aes-256-cbc';

client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query('SELECT NOW() AS "theTime";', function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].theTime);
        // >> output: 2018-08-23T14:02:57.117Z
    });  
});

const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'saccomander@gmail.com',
    pass: process.env.EMAIL_KEY
  }
});

const bearerTokenOptions = {
    path: '/',
    httpOnly: true,
    maxAge: 30 * 60 * 1000 // expires in 30 minutes (min * sec * millisec)
}

// table schemas
const accountSchema = tables.accounts
const passwordSchema = tables.passwords
const circleSchema = tables.circles
const refreshTokensSchema = tables.refreshTokens

app.listen(process.env.PORT, () => {
    console.log(`server is live on port ${process.env.PORT}`)
})

// scheduled cron jobs
scheduler.scheduleJob('0 0 * * *', async () => { // runs once every day at 12 am to delete all refresh tokens in the table that are expired
    await client.query(`DELETE FROM refresh_tokens WHERE expiry_date < NOW();`)
})

const authorizeUser = (req, res, next) => {
    const bearerToken = req.cookies.keyHavenBearerToken || null

    if (!bearerToken) {
        const response = responses('bearer token missing')
        return res.status(response.code).send(response.body)
    }

    jwt.verify(bearerToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
            const response = responses('bearer token is invalid', 401)
            return res.status(response.code).send(response.body)
        }
        req.user = user
        next()
    })
}

const generateRefreshToken = async (email) => {
    let refreshToken = null
    try {
        refreshToken = jwt.sign({email: email}, process.env.JWT_REFRESH_KEY)
        await client.query(`INSERT INTO refresh_tokens VALUES(${refreshToken}, (NOW() AT TIME ZONE 'est'))`)
    } catch(err) {
        console.log(err)
    }
    return refreshToken
}

app.get('/api', async (req, res) => {
    res.status(200).send({
        message: `Welcome to KeyHaven's Express Server`
    })
}
);

app.post('/test', async (req, res) => {
    try {
        const results = await client.query('CREATE TABLE IF NOT EXISTS abhinav( id SERIAL PRIMARY KEY, username TEXT UNIQUE );');
        const response = responses('success-default')
        res.status(response.code).send(response.body)
    } catch (err) {
        console.log(err);
    }
});

// select all rows from circles table
app.get('/test1', authorizeUser, async (req, res) => {
    try {
        const results = await client.query('SELECT * FROM circles;');
        res.json(results.rows);
    } catch (err) {
        console.log(err);
    }
});

// adds a new row of data to circles table
app.post('/test2', async (req, res) => {
    try {
        const results = await client.query(`INSERT INTO circles (title, members) VALUES('new test', ARRAY [32, 1023]);`);
        const response = responses('success-default')
        res.status(response.code).send(response.body)
    } catch (err) {
        console.log(err);
    }
});

// appends a new text value to an existing row in circles table
app.put('/test3', async (req, res) => {
    try {
        const results = await client.query(`UPDATE circles SET members = ARRAY_APPEND(members, '999') WHERE title = 'new test';`)
        const response = responses('success-default')
        res.status(response.code).send(response.body)
    } catch (err) {
        console.log(err);
    }
})

// creates all table schemas in db if they do not exist
app.post('/create-tables', async (req, res) => {
    try {
        await client.query(accountSchema)
        await client.query(passwordSchema)
        await client.query(circleSchema)
        await client.query(refreshTokensSchema)
        const response = responses('success-default')
        res.status(response.code).send(response.body)
    } catch(err) {
        console.log(err);
    }
});

function responses1(status) {
    if (status) {
        if (status === 'success-default') {
            return {code: 200, body: {type: 'SUCCESS'}}
        }
        return null
    }
    return null
}

const saveVerifToken = async (req, columnName) => {
    const token = crypto.randomBytes(16).toString('hex')
    req.body.verifToken = token
    await client.query(`UPDATE account_verif SET ${columnName} = '${token}' WHERE email = '${req.body.receiverID}';`)
}

app.post('/email', authorizeUser, async (req, res) => {
    try {
        if (req.body.type === 'verifyAccount') {
            const result = await client.query(`SELECT is_verified FROM accounts WHERE email = '${req.body.receiverID}';`)
            if (!result.rowCount) {
                throw 'Internal Error'
            }


            if (result.rows[0].is_verified) {
                throw 'User is already verified!'
            }
            
            saveVerifToken(req, 'email_key')
        } else if (req.body.type === 'changeMasterPassword') {
            saveVerifToken(req, 'pass_key')
        }

        const mailOptions = {
            from: 'saccomander@gmail.com',
            to: req.body.receiverID,
            subject: `KeyHaven: ${req.body.title}`,
            html: emailContentBuilder(req.body)
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              throw(error);
            } else {
                const response = responses('success-default')
                res.status(response.code).send(response.body)
            }
        })
    } catch (err) {
        res.status(500).send(err)
    }
})


// ACCOUNT

app.get('/account', authorizeUser, async (req, res) => {
    try {
        const email = req.user.email
        const results = await client.query(`SELECT first_name, last_name, email, is_verified, joined, profile_image_url FROM accounts WHERE email = '${email}';`);
        let response
        if (!results.rowCount) {
            response = responses('account not found', 404)
        } else {
            response = responses('success-value', results.rows[0])
        }
        res.status(response.code).send(response.body)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.get('/account/isVerified', authorizeUser, async (req, res) => {
    try {
        const email = req.user.email
        const results = await client.query(`SELECT is_verified FROM accounts WHERE email = '${email}';`);
        let response
        if (!results.rowCount) {
            response = responses('account not found', 404)
        } else {
            response = responses('success-value', results.rows[0].is_verified)
        }
        res.status(response.code).send(response.body)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.get('/account/isLoggedIn', async (req, res) => {
    try {
        let response
        if (req.cookies.keyHavenBearerToken) {
            response = responses('success-default')
        } else {
            response = responses('account not found', 404)
        }
        res.status(response.code).send(response.body)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.put('/account', authorizeUser, async(req, res) => {
    try {
        const email = req.user.email
        await client.query(`UPDATE accounts SET first_name = '${req.body.firstName}', last_name = '${req.body.lastName}' WHERE email = '${email}';`);
        const response = responses('success-default')
        res.status(response.code).send(response.body)
    } catch(err) {
        res.status(500).send(err)
    }
})

app.put('/account/changeMasterPassword/:email/:token', async(req, res) => {
    try {
        if (!req.body.password) {
            throw 'Invalid password received!'
        }

        const email = req.params.email
        const token = req.params.token
        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(req.body.password, salt)

        Promise.all([client.query(`UPDATE account_verif SET pass_key = '' WHERE email = '${email}';`), client.query(`UPDATE accounts SET password = '${hash}' WHERE email = '${email}';`)]).then(_ => {
            const response = responses('success-default')
            res.status(response.code).send(response.body)
        })
    } catch(err) {
        res.status(500).send(err)
    }
})

app.get('/account/checkMasterPasswordChange/:email/:token', async(req, res) => {
    try {
        const email = req.params.email
        const token = req.params.token
        
        const result = await client.query(`SELECT pass_key FROM account_verif WHERE email = '${email}';`)
        
        if (!result.rowCount || token !== result.rows[0].pass_key) {
            throw 'Invalid link!'
        }
        const response = responses('success-default')
        res.status(response.code).send(response.body)
    } catch(err) {
        res.status(500).send(err)
    }
})

app.post('/account/signup', async (req, res) => {
    try {
        const isDuplicateEmail = (await client.query(`SELECT * FROM accounts WHERE email = '${req.body.email}';`)).rowCount

        if (isDuplicateEmail) {
            const response = responses('email is already taken')
            res.status(response.code).send(response.body)
            return
        }

        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(req.body.password, salt)
        const secretKey = crypto.randomBytes(32).toString('hex')
        const iv = crypto.randomBytes(16).toString('hex')

        await client.query(`INSERT INTO accounts (email, password, joined, is_verified) VALUES('${req.body.email}', '${hash}', (NOW() AT TIME ZONE 'est'), false);`)
        await client.query(`INSERT INTO account_verif (email, email_key, pass_key) VALUES('${req.body.email}', '', '');`)
        await client.query(`INSERT INTO password_secrets (email, secret_key, iv) VALUES('${req.body.email}', '${secretKey}', '${iv}');`)

        const bearerToken = jwt.sign({email: req.body.email}, process.env.JWT_ACCESS_KEY, {expiresIn: '10000s'})

        const response = responses('success-default')
        
        res.status(response.code).cookie('keyHavenBearerToken', bearerToken, bearerTokenOptions).send(response.body);
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.post('/account/login', async (req, res) => {
    try {
        const isValidEmail = await client.query(`SELECT password FROM accounts WHERE email = '${req.body.email}';`)
        if (isValidEmail.rows.length) {
            const isValidPassword = await bcrypt.compare(`${req.body.password}`, `${isValidEmail.rows[0].password}`)
            if (isValidPassword) {

                const bearerToken = jwt.sign({email: req.body.email}, process.env.JWT_ACCESS_KEY, {expiresIn: '10000s'})

                const response = responses('success-default')
                
                res.status(response.code).cookie('keyHavenBearerToken', bearerToken, bearerTokenOptions).send(response.body);
            } else {
                throw(responses('invalid credentials'))
            }
        } else {
            throw(responses('invalid credentials'))
        }
    } catch (err) {
        if (err.hasOwnProperty('code')) {
            res.status(err.code).send(err.body)
        } else {
            res.status(500).send(err)
        }
    }
})

app.post('/account/logout', authorizeUser, async (req, res) => {
    try {
        res.clearCookie('keyHavenBearerToken')
        const response = responses('success-default')
        res.status(response.code).send(response.body)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.delete('/account', authorizeUser, async (req, res) => {
    try {
        const email = req.user.email
        res.clearCookie('keyHavenBearerToken')
        
        await client.query(`DELETE FROM passwords WHERE owned_by = '${email}';`)
        await client.query(`UPDATE passwords SET emails = ARRAY_REMOVE(emails, '${email}') WHERE '${email}' = ANY (emails);`)
        await client.query(`DELETE FROM password_secrets WHERE email = '${email}';`)
        await client.query(`DELETE FROM account_verif WHERE email = '${email}';`)
        await client.query(`DELETE FROM accounts WHERE email = '${email}';`)

        const response = responses('success-default')
        res.status(response.code).send(response.body)
    } catch (err) {
        res.status(500).send(err)
    }
})

// ACCOUNT VERIFICATION

app.get('/verifyEmail/:email/:token', async (req, res) => {
    try {
        const email = req.params.email
        const token = req.params.token
        const result = await client.query(`SELECT email_key from account_verif WHERE email = '${email}'`);

        if (!result.rowCount) {
            throw 'Internal Error'
        }
        if (token !== result.rows[0].email_key) {
            throw 'Email link is invalid'
        }
        Promise.all([client.query(`UPDATE account_verif SET email_key = '' WHERE email = '${email}';`), client.query(`UPDATE accounts SET is_verified = TRUE WHERE email = '${email}';`)]).then(_ => {
            const response = responses('success-default')
            res.status(response.code).send(response.body)
        })
    } catch (err) {
        res.status(500).send(err)
    }
})

// PASSWORD-ACCOUNT

app.get('/passwordAccount', authorizeUser, async (req, res) => {
    try {
        const userEmail = req.user.email

        const secretKeyResult = await client.query(`SELECT secret_key, iv FROM password_secrets WHERE email = '${userEmail}'`);
        if (!secretKeyResult.rowCount) {
            throw 'Internal Error'
        }

        const secretKeyUser = secretKeyResult.rows[0].secret_key
        const ivUser = secretKeyResult.rows[0].iv
        const results = await client.query(`SELECT * FROM passwords WHERE '${userEmail}' = ANY (emails) AND array_length(emails, 1) = 1 ORDER BY id;`);

        let passAccounts = results.rows
        for (const account of passAccounts) {
            const ownerEmail = account.owned_by
            let secretKey = secretKeyResult.rows[0].secret_key
            let iv = secretKeyResult.rows[0].iv

            if (ownerEmail === userEmail) {
                secretKey = secretKeyUser
                iv = ivUser
            } else {
                const secretKeyResult = await client.query(`SELECT secret_key, iv FROM password_secrets WHERE email = '${ownerEmail}'`);
                if (!secretKeyResult.rowCount) {
                    throw 'Internal Error'
                }
                secretKey = secretKeyResult.rows[0].secret_key
                iv = secretKeyResult.rows[0].iv
            }

            // MORE OPTMIZATION: cache the users whose keys have been called from DB, including that of the current user

            const decipher = crypto.createDecipheriv(cryptoAlgorithm, Buffer.from(secretKey, 'hex'), Buffer.from(iv, 'hex'))
            account.password = decipher.update(account.password, 'hex', 'utf8') + decipher.final('utf8')
        }

        const response = responses('success-value', passAccounts)
        res.status(response.code).send(response.body)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.post('/passwordAccount', authorizeUser, async (req, res) => {
    try {
        const email = req.user.email
        const secretKeyResult = await client.query(`SELECT secret_key, iv FROM password_secrets WHERE email = '${email}'`);
        if (!secretKeyResult.rowCount) {
            throw 'Internal Error'
        }

        const secretKey = secretKeyResult.rows[0].secret_key
        const iv = secretKeyResult.rows[0].iv
        const cipher = crypto.createCipheriv(cryptoAlgorithm, Buffer.from(secretKey, 'hex'), Buffer.from(iv, 'hex'))
        const password = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex')

        await client.query(
            `INSERT INTO passwords
             (title, url, icon_url, emails, password, updated, username, updated_by, owned_by)
             VALUES ('${req.body.title}', '${req.body.url}', '${req.body.iconUrl}', ARRAY ['${email}'], '${password}', (NOW() AT TIME ZONE 'est'), '${req.body.username}', '${email}', '${email}');`
        )
        const response = responses('success-default')
        res.status(response.code).send(response.body)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.put('/passwordAccount', authorizeUser, async (req, res) => {
    try {
        const userEmail = req.user.email

        const ownerResult = await client.query(`SELECT owned_by FROM passwords WHERE '${userEmail}' = ANY (emails) AND title = '${req.body.prevTitle}'`);
        if (!ownerResult.rowCount) {
            throw 'Internal Error'
        }

        const ownerEmail = ownerResult.rows[0].owned_by

        const secretKeyResult = await client.query(`SELECT secret_key, iv FROM password_secrets WHERE email = '${ownerEmail}'`);
        if (!secretKeyResult.rowCount) {
            throw 'Internal Error'
        }

        const secretKey = secretKeyResult.rows[0].secret_key
        const iv = secretKeyResult.rows[0].iv
        const cipher = crypto.createCipheriv(cryptoAlgorithm, Buffer.from(secretKey, 'hex'), Buffer.from(iv, 'hex'))
        const password = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex')

        await client.query(
            `UPDATE passwords
             SET title = '${req.body.title}', username = '${req.body.username}', password = '${password}', url = '${req.body.url}', icon_url = '${req.body.iconUrl}', updated = (NOW() AT TIME ZONE 'est'), updated_by = '${userEmail}'
             WHERE '${userEmail}' = ANY (emails) AND title = '${req.body.prevTitle}';`
        )
        const response = responses('success-default')
        res.status(response.code).send(response.body)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.delete('/passwordAccount/:title', authorizeUser, async (req, res) => {
    try {
        const userEmail = req.user.email

        const ownerResult = await client.query(`SELECT owned_by FROM passwords WHERE '${userEmail}' = ANY (emails) AND title = '${req.params.title}'`);
        if (!ownerResult.rowCount) {
            throw 'Internal Error'
        }

        const ownerEmail = ownerResult.rows[0].owned_by

        if (ownerEmail !== userEmail) {
            throw `Current user is not the password's owner`
        }

        await client.query(`DELETE FROM passwords WHERE '${userEmail}' = ANY (emails) AND title = '${req.params.title}';`)
        const response = responses('success-default')
        res.status(response.code).send(response.body)
    } catch (err) {
        res.status(500).send({type: 'FAIL', message: err})
    }
})

// In circles, a password has only one owner. The owner can:

// 1. Restrict access - meaning if any value is changed by a shared user, they will need approval for the change by owner
// 2. Have history log of specific changes (values not shown, only the fields) made by shared users and owner


// prevent '?' in any text!!
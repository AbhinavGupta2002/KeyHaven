const express = require('express')
const cors = require('cors')
const pg = require('pg')
const tables = require('./tables.js')
const responses = require('./responses.js')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const scheduler = require('node-schedule')
const mailer = require('nodemailer')

const app = express()
dotenv.config()
const connectionString = process.env.CONNECTION_STRING

app.use(express.json());
app.use(cors());

let client = new pg.Client(connectionString)

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
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader && authHeader.split(' ')[1]
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

app.post('/signup', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(req.body.password, salt)
        await client.query(`INSERT INTO accounts (email, password, joined, is_verified) VALUES('${req.body.email}', '${hash}', (NOW() AT TIME ZONE 'est'), false);`)
        const response = responses('success-default')
        res.status(response.code).send(response.body)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

function responses1(status) {
    if (status) {
        if (status === 'success-default') {
            return {code: 200, body: {type: 'SUCCESS'}}
        }
        return null
    }
    return null
}

app.post('/login', async (req, res) => {
    console.log(req.body)
    try {
        const isValidEmail = await client.query(`SELECT password FROM accounts WHERE email = '${req.body.email}';`)
        if (isValidEmail.rows.length) {
            const isValidPassword = await bcrypt.compare(`${req.body.password}`, `${isValidEmail.rows[0].password}`)
            if (isValidPassword) {
                const bearerToken = jwt.sign({email: req.body.email}, process.env.JWT_ACCESS_KEY, {expiresIn: '20s'})
                const response = responses('success-value', bearerToken)
                res.status(response.code).send(response.body)
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

app.post('/email', async (req, res) => {
    try {
        const mailOptions = {
            from: 'saccomander@gmail.com',
            to: req.body.receiverID,
            subject: req.body.title,
            html: req.body.type === 'general' ?
                    `<h3 style="color: blue;">${req.body.content}</h3>` :
                    req.body.type === 'verifyAccount' ?
                    `<h3 style="color: green;">${req.body.content}</h3>`
                    : ``
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              throw(error);
            } else {
                const response = responses('success-default')
                res.status(response.code).send(response.body)
            }
        });
    } catch (err) {
        res.status(500).send(err)
    }
})


// ACCOUNT

app.get('/account/:email', async (req, res) => {
    try {
        const email = req.params.email
        const results = await client.query(`SELECT * FROM accounts WHERE email = '${email}';`);
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

app.put('/account', async(req, res) => {
    // add here
})

// PASSWORD-ACCOUNT

app.get('/passwordAccount/:email', async (req, res) => {
    try {
        const email = req.params.email
        const results = await client.query(`SELECT * FROM passwords WHERE '${email}' = ANY (emails);`);
        const response = responses('success-value', results.rows)
        res.status(response.code).send(response.body)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.post('/passwordAccount', async (req, res) => {
    try {
        await client.query(
            `INSERT INTO passwords (title, url, icon_url, emails, password, updated, username, updated_by) VALUES ('${req.body.title}', '${req.body.url}', '${req.body.iconUrl}', ARRAY ['${req.body.email}'], '${req.body.password}', CURRENT_TIMESTAMP, '${req.body.username}', '${req.body.email}');`
        )
        const response = responses('success-default')
        res.status(response.code).send(response.body)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.delete('/passwordAccount/:email/:title', async (req, res) => {
    try {
        await client.query(`DELETE FROM passwords WHERE '${req.params.email}' = ANY (emails) AND title = '${req.params.title}'`)
        const response = responses('success-default')
        res.status(response.code).send(response.body)
    } catch (err) {
        res.status(500).send(err)
    }
})

const express = require("express")
const cors = require("cors")
const app = express()
const pg = require("pg")
const tables = require('./tables')
const responses = require('./responses')

require('dotenv').config()
const connectionString = process.env.CONNECTION_STRING

app.use(express.json());
app.use(cors());

let client = new pg.Client(connectionString)

client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query('SELECT NOW() AS "theTime"', function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].theTime);
        // >> output: 2018-08-23T14:02:57.117Z
    });  
});

// table schemas
const accountSchema = tables.accounts
const passwordSchema = tables.passwords
const circleSchema = tables.circles

app.listen(process.env.PORT, () => {
    console.log(`server is live on port ${process.env.PORT}`)
})

app.get('/api', (req, res) =>
    res.status(200).send({
        message: 'Welcome to Express Api',
    })
);

app.post('/test', async (req, res) => {
    try {
        const results = await client.query('CREATE TABLE IF NOT EXISTS abhinav( id SERIAL PRIMARY KEY, username TEXT UNIQUE )');
        const response = responses('success-default')
        res.status(response.code).send(response.body)
    } catch (err) {
        console.log(err);
    }
});

// select all rows from circles table
app.get('/test1', async (req, res) => {
    try {
        const results = await client.query('SELECT * FROM circles');
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
        const response = responses('success-default')
        res.status(response.code).send(response.body)
    } catch(err) {
        console.log(err);
    }
});

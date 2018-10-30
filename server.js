require('dotenv').config()
const PORT = process.env.PORT

const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const age = require('./controllers/age')

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.DB_NAME
  }
})

const app = express()

app.use(bodyParser.json())
app.use(cors())

//app.get('/', (req, res) => res.send(database.users))
app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db))
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt)) //syntax1
app.post('/register', register.handleRegister(db, bcrypt)) //syntax 2
app.put('/image', (req, res) => {
  image.handleImage(req, res, db)
})
app.put('/image/age', (req, res) => image.handleAge(req, res, db))
app.post('/imageurl', (req, res) => image.handleApiCall(req, res))

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})

/*
/ --> res= this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT
*/

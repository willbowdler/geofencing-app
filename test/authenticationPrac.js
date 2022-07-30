// This needs to be deleted this is only for testing purposes

// const mongoose = require('mongoose')
// const LocalStrategy = require('passport-local')

// let strategy = new LocalStrategy(function verify(username, password, cb) {

// })

const express = require('express')
const session = require('express-session')

const app = express()

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'asfiubuehqoubne',
    cookie: { maxAge: 60000 },
  })
)

let sessionData
app.get('/set_session', (req, res) => {
  sessionData = req.session
  sessionData.use = {}
  let username = 'will'
  sessionData.user.username = username
})

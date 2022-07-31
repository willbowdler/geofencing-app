const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')

require('dotenv').config()
require('./config/passport')

const PORT = process.env.PORT || 3001
const app = express()

const authRoutes = require('./routes/auth')
const passport = require('passport')

mongoose.connect('mongodb://localhost:27017/geofencing-db')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/geofencing-db',
      collection: 'sessions',
    }),
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    secret: process.env.SESSION_SECRET, // you need to figure out how secure this is
  })
)

app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/api/auth', authRoutes)

app.get('/api', (req, res) => {
  try {
    console.log(req.session)
  } catch (error) {
    console.log(error.message)
  }
  res.json({ message: 'Hello from server!' })
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})

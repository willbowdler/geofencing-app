const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()

const PORT = process.env.PORT || 3001
const app = express()

const authRoutes = require('./routes/auth')
const returnWeeds = require('./middleware/returnWeeds')

mongoose.connect('mongodb://localhost:27017/geofencing-db')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)

app.get('/api/weeds', returnWeeds)

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' })
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})

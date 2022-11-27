const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

require('dotenv').config()

const PORT = process.env.PORT || 3001
const app = express()

const authRoutes = require('./routes/auth')
const emailRoutes = require('./routes/email')
const returnWeeds = require('./middleware/returnWeeds')

mongoose.connect(
  `mongodb+srv://wbowdler:${process.env.MONGO_PASS}@geofencingc.v1rov.mongodb.net/weeds`
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/email', emailRoutes)

app.get('/api/weeds', returnWeeds)

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' })
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})

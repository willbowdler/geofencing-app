const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3001
const app = express()

const auth = require('./routes/auth')

mongoose.connect('mongodb://localhost:27017/geofencing-db')

app.use(bodyParser.json())
app.use('/api/auth', auth)

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' })
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})

const express = require('express')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3001
const app = express()

const auth = require('./routes/auth')

app.use(bodyParser.json())
app.use('/api/auth', auth)

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' })
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})

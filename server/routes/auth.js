const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/userModel')

router.post('/register', async (req, res) => {
  const hashedPass = await bcrypt.hash(req.body.pass, 15)
  const newData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    pass: hashedPass,
  }
  const newUser = new User(newData)
  newUser.save((err) => {
    err && console.log(err.message)
  })

  console.log(newData)
  res.send('it worked')
})

module.exports = router

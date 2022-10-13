const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

router.post('/register', async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.pass, 10)
    const newData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPass,
      roles: { user: 1234 },
    }
    const newUser = await new User(newData)
    newUser.save((err) => {
      err && console.log(err.message)
    })

    res.send('it worked')
  } catch (error) {
    res.status(500).send()
  }
})

router.post('/login', async (req, res) => {
  let newUser
  try {
    newUser = User.findOne({ email: email })
    if (!newUser || password !== newUser.password) {
    }
  } catch (error) {}
})

router.post('/logout', async (req, res) => {
  res.end()
})

module.exports = router

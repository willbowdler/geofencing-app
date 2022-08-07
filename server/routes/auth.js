const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/userModel')
const passport = require('passport')

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

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const user = req.session.passport.user
  console.log(user)
  res.send(user)
})

router.post('/logout', async (req, res) => {
  res.end()
})

module.exports = router

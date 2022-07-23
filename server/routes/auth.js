const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/userModel')

router.post('/register', async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.pass, 10)
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
  } catch (error) {
    res.status(500).send()
  }
})

router.post('/login', async (req, res) => {
  const user = '' // add mongoose functionality that looks for the user based on email
  try {
    if (await bcrypt.compare(req.body.pass, user.pass)) {
      res.send('This user exists and this is the right password')
    } else {
      res.send('Unsuccessful')
    }
    // then give them permission to access the dashboard and then route them to the dashboard
  } catch (error) {}
})

router.post('/logout', async (req, res) => {
  res.end()
})

module.exports = router

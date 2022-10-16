const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

router.post('/register', async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10)
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
  const email = req.body.email
  const password = req.body.password
  const newUser = await User.findOne({ email: email })

  try {
    if (newUser && passBool) {
      const passBool = await bcrypt.compare(password, newUser.password)
      const accessToken = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET)
      res.json({ auth: true, accessToken: accessToken })
      console.log('Christy Bowdler')
    }

    if (!newUser || !passBool) {
      console.log('man, you put in the wrong info')
      res.send({ error: 'wrong info' })
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/logout', async (req, res) => {
  res.end()
})

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token']
  !token
    ? res.send('We need a token')
    : jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.json({ auth: false, message: 'Authentication failed.' })
        } else req.userId = decoded.id
      })
}

module.exports = router

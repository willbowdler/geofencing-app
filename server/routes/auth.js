const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

router.get('/persistLogin', async (req, res) => {
  const cookieToken = req.cookies.token

  cookieToken
    ? jwt.verify(cookieToken, process.env.JWT_SECRET, (err, serialized) => {
        err ? res.json({ error: err.message }) : res.json({ user: serialized })
      })
    : res.json({ message: 'You must log in' })
})

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

    const userExists = await User.findOne({ email: newData.email })
    if (userExists) {
      throw Error('User already exists')
    }

    if (!userExists) {
      const newUser = await new User(newData)
      newUser.save((err) => {
        err && console.log(err.message)
      })
      const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: '3d',
      })
      res
        .status(200)
        .cookie('token', token, {
          httpOnly: true,
          expires: new Date(Date.now() + 900000),
        })
        .json({ user: newUser, token: token })
    }
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ user: null, error: error.message })
  }
})

router.post('/login', async (req, res) => {
  console.log(req.cookies)
  const { email, password } = req.body
  const newUser = await User.findOne({ email: email })

  try {
    if (!newUser) throw Error('User does not exist')

    const passBool = await bcrypt.compare(password, newUser.password)
    if (passBool) {
      const accessToken = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET)

      res
        .cookie('token', accessToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 900000),
        })

        .json({ user: newUser, auth: true, accessToken: accessToken })

      console.log('Christy Bowdler')
    } else {
      throw Error('Incorrect password')
    }
  } catch (error) {
    console.log(error)
  }
})

router.get('/logout', async (req, res) => {
  req.cookies.token && res.clearCookie('token').end()
})

module.exports = router

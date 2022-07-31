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

// router.post('/login', passport.authenticate('local'))
//   const user = ''

//   // validatePassword

//   if (await bcrypt.compare(req.body.pass, user.pass)) {
//     res.send('This user exists and this is the right password')
//   } else {
//     res.send('Unsuccessful')
//     // then give them permission to access the dashboard and then route them to the dashboard
//   }
//

router.post('/login', passport.authenticate('local'))

router.post('/logout', async (req, res) => {
  res.end()
})

module.exports = router

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

const customField = {
  usernameField: 'email',
}

const verifyCallback = (username, password, done) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return done(null, false)
      }

      if (bcrypt.compare(req.body.pass, user.pass)) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
    .catch((err) => {
      done(err)
    })
}

const strategy = new LocalStrategy(customField, verifyCallback)

passport.use(strategy)

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

// What is the custom fields for?
//Include validate password function inside of your verifyCallback

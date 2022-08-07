const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

const customField = {
  usernameField: 'email',
}

const verifyCallback = (username, password, done) => {
  User.findOne({ email: username })
    .then((user) => {
      if (!user) {
        console.log('there is no user')
        return done(null, false)
      }

      bcrypt.compare(password, user.password, function (err, isValid) {
        if (isValid) {
          console.log('yeup')
          return done(null, user)
        } else {
          console.log('nope')
          return done(err)
        }
      })
    })
    .catch((err) => {
      done(err)
    })
}

const strategy = new LocalStrategy(customField, verifyCallback)

passport.use(strategy)

passport.serializeUser((user, done) => {
  done(null, user)
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

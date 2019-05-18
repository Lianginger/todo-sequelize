const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const db = require('../models')
const User = db.User
module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ where: { email } })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'That email is not registered' })
          }
          if (user.password != password) {
            console.log('user password incorrect')
            return done(null, false, { message: 'Password incorrect' })
          }
          return done(null, user)
        })
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id).then((user) => {
      done(null, user)
    })
  })
}
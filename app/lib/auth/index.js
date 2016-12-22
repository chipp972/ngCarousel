/**
 * @module auth
 */
'use strict'
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const generateSecret = require('password-generator')

/**
 * Configure the application authentication system using [passport]{@link http://passportjs.org}
 * @function configureApp
 * @param  {Express.Application} app  express application object
 * @param  {DatabaseObject}      db   Database object
 */
module.exports = function (app, db) {
  // authentication
  app.use(cookieParser())
  app.use(session({
    secret: generateSecret(33, false),
    name: 'opstats',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: new MongoStore({
      mongooseConnection: db.connection,
      ttl: 14 * 24 * 60 * 60,
      autoRemove: 'disabled',
      touchAfter: 24 * 3600
    }),
    cookie: {
      // secure: true,
      httpOnly: true
    }
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  // auth system configuration
  passport.use(new LocalStrategy(db.User.authenticate()))
  passport.serializeUser(db.User.serializeUser())
  passport.deserializeUser(db.User.deserializeUser())
}

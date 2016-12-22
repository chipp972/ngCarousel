'use strict'

const express = require('express')
const passport = require('passport')

module.exports = function getAuthRoutes (db) {
  const router = express.Router()

  // authentication endpoint (guest allowed)
  router.route('/login')
  .post((req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err)
      } else if (!user) {
        const err2 = new Error('Login ou Mot de passe non valide')
        err2.status = 404
        return next(err2)
      }
      req.logIn(user, function (err) {
        if (err) { return next(err) }
        return res.status(200).json({ success: true })
      })
    })(req, res, next)
  })

  // registration page and endpoint (guest allowed)
  router.route('/register')
  .post((req, res, next) => {
    db.User.find({}).exec()
    .then((documents) => {
      const obj = { username: req.body.username }
      if (documents.length === 0) { obj['admin'] = true }
      const user = new db.User(obj)
      const password = req.body.password
      db.User.register(user, password, (err, account) => {
        if (err) {
          db.logger.error(err)
          return next(err)
        } else {
          res.status(200).json({ success: true, message: 'Compte crée et activé' })
        }
      })
    })
    .catch(err => {
      db.logger.error(err)
      next(err)
    })
  })

  // logout endpoint
  router.route('/logout')
  .get((req, res, next) => {
    req.logout()
    res.json({ success: true, message: 'user logged out' })
  })

  return router
}

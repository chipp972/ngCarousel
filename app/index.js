'use strict'
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const getRoutes = require('./routes')
const getDatabaseConnection = require('./models')

/**
 * Initialize the express application
 * @return {Express.Application}
 */
function initApp () {
  return new Promise((resolve, reject) => {
    const app = express()
    // connect to the database and get the routes

    getDatabaseConnection()
    .then((db) => {
      /* middlewares setup */

      // logs
      app.use(morgan('dev'))

      // requests middlewares
      app.use(bodyParser.json())
      app.use(bodyParser.urlencoded({ extended: true })) // to pass queries

      // assets and angular app
      app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))
      app.use(express.static(path.join(__dirname, '../public')))

      // database and app disconnection handlers
      db.connection.once('disconnected', () => {
        console.log('server is down')
        process.exit(0)
      })
      process.once('SIGINT', () => {
        console.log('Server is down')
        db.connection.close(() => {
          process.exit(0)
        })
      })

      // routes
      app.use(getRoutes(db))

      // request errror handler
      app.use((err, req, res, next) => {
        const s = err['status'] || 500

        console.error(err)
        return res.status(s).json({
          message: err.message,
          success: false
        })
      })

      // return app
      resolve(app)
    }) // end of getDatabaseConnection
    .catch(err => {
      console.error(err)
      reject(err)
    })
  })
}

module.exports = initApp

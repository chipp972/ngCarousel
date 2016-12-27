/**
 * Database initialization
 */
'use strict'
const mongoose = require('mongoose')
const getConfig = require('../config')

// global and plugins initialisations
mongoose.Promise = global.Promise

// models
const CarouselModel = require('./carousel')
const ContentModel = require('./content')

/**
 * Initialize the database connection and returns a database object
 * @return {DatabaseObject} object with the database informations and connection
 */
function getDatabaseConnection () {
  return new Promise((resolve, reject) => {
    getConfig()
    .then((config) => {
      const dbInfo = config.db
      const uri = `${dbInfo.type}://${dbInfo.host}:${dbInfo.port}/${dbInfo.database}`

      mongoose.connect(uri) // no authentication

      // connection events
      // When successfully connected
      mongoose.connection.once('connected', function () {
        console.log(`database connection to ${uri}: success`)

        resolve({
          connection: mongoose.connection,
          Content: ContentModel,
          Carousel: CarouselModel
        })
      })

      // If the connection throws an error
      mongoose.connection.on('error', function (err) {
        console.error(`database error: ${err}`)
        if (!this.isFulfilled) {
          reject(err)
        }
      })

      // When the connection is dropped
      mongoose.connection.on('disconnected', function () {
        console.log(`database connection to ${uri}: disconnection`)
      })

      // If the Node process ends, close the Mongoose connection
      process.on('SIGINT', function () {
        mongoose.connection.close(function () {
          let msg = `database connection to ${uri}: disconnected through` +
           'app termination'
          console.log(msg)
        })
      })
    })
    .catch(err => reject(err))
  })
}

module.exports = getDatabaseConnection

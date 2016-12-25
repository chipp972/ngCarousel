'use strict'

const express = require('express')

const getModelRoutes = require('./models')
const getCarouselRoutes = require('./carousel')
/**
 * Construct the router for the express app with all routes
 */
module.exports = function getAllRoutes (db) {
  const router = express.Router()

  router.use('/api/', getCarouselRoutes(db))
  router.use('/api/', getModelRoutes(db))

  // catch 404 and forward to error handler
  router.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  return router
}

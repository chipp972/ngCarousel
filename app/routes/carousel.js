'use strict'
const express = require('express')

module.exports = function getCarouselRoutes (db) {
  const router = express.Router()

  router.route('/carousel')
  .get((req, res, next) => {
    db.Carousel.find({}).populate('items._id').exec()
    .then((carouselList) => {
      return res.status(200).json(carouselList)
    })
    .catch(err => next(err))
  })

  router.route('/carousel/:id')
  .get((req, res, next) => {
    db.Carousel.findOne({ _id: req.params['id'] })
    .populate('items._id').exec()
    .then((carousel) => {
      return res.status(200).json(carousel)
    })
    .catch(err => next(err))
  })

  return router
}

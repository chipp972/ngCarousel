'use strict'
const mongoose = require('mongoose')

const modelName = 'Carousel'

const CarouselSchema = new mongoose.Schema({
  name: { required: true, type: String, maxLength: 50 },
  items: [{
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' },
    position: { required: true, type: Number, min: 0, max: 9 }
  }]
})

const CarouselModel = mongoose.model(modelName, CarouselSchema)

module.exports = CarouselModel

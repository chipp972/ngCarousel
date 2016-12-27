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

/**
 * Reorder content in the carousel and recompute the positions
 */
CarouselSchema.methods.reorder = function () {
  return new Promise((resolve, reject) => {
    this.items.sort((a, b) => {
      return a.position - b.position
    })
    this.items = this.items.map((item, index) => {
      item.position = index
      return item
    })
    this.save()
    .then(() => resolve())
    .catch((err) => reject(err))
  })
}

const CarouselModel = mongoose.model(modelName, CarouselSchema)

module.exports = CarouselModel

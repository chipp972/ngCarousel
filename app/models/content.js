/**
 * The content to present inside the carousel
 */
const mongoose = require('mongoose')
const CarouselModel = require('./carousel')

const modelName = 'Content'

const ContentSchema = new mongoose.Schema({
  title: { required: true, type: String, maxlength: 50, trim: true },
  body: { type: String, maxlength: 750, trim: true },
  reference: {
    required: true,
    type: String,
    minlength: 10,
    maxlength: 10,
    unique: true
  }
})

ContentSchema.post('remove', function (document, next) {
  CarouselModel.find({}).exec()
  .then((carouselList) => {
    const promiseList = []
    // delete the content from each carousel
    carouselList.forEach((carousel) => {
      let item = carousel.items.id(document._id)
      if (item) {
        carousel.items.id(document._id).remove()
        .then(() => {
          // then reorder the carousel
          promiseList.push(carousel.reorder())
        })
        .catch((err) => next(err))
      }
    })
    Promise.all(promiseList)
    .then(() => next())
    .catch((err) => next(err))
  })
})

const ContentModel = mongoose.model(modelName, ContentSchema)

module.exports = ContentModel

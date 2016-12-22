/**
 * The content to present inside the carousel
 */
'use strict'
const mongoose = require('mongoose')

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

const ContentModel = mongoose.model(modelName, ContentSchema)

module.exports = ContentModel

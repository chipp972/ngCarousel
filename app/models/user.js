'use strict'
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const modelName = 'User'

let UserSchema = new mongoose.Schema({
  username: { required: true, type: String, index: { unique: true } },
  admin: Boolean
})

// plugins
UserSchema.plugin(passportLocalMongoose)

// hooks
UserSchema.pre('save', function (next) {
  let user = this
  user.admin = user.admin || false
  next()
})

let UserModel = mongoose.model(modelName, UserSchema)

module.exports = UserModel

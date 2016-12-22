'use strict'

const express = require('express')

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Construct the router to access models and operate on them
 * @function module:routes~getModelRoutes
 * @param  {DatabaseObject} db
 * @return {Express.Router}
 */
module.exports = function getModelRoutes (db) {
  const router = express.Router()

  let modelList = Object.keys(db.connection.models)
  .map((e) => {
    return e.toLowerCase()
  })
  .filter((e) => {
    return e !== 'user' // private models
  })

  router.route('/') // list of models available
  .get((req, res, next) => {
    res.status(200).json(modelList)
  })

  // param middleware to get the name of the model or 404 error
  function extractModelName (req, res, next, modelName) {
    if (modelList.indexOf(modelName) === -1) {
      let err = new Error(`No model ${modelName} found`)
      err.status = 404
      return next(err)
    }
    req['modelName'] = capitalizeFirstLetter(modelName)
    next()
  }

  // param middleware to retrieve the document
  function extractModelId (req, res, next, id) {
    db[req['modelName']].findById(id).exec()
    .then((obj) => {
      if (!obj) {
        let err = new Error(`No document with id ${id} in ${req['modelName']}`)
        err.status = 404
        return next(err)
      }
      req['model'] = obj
      next()
    })
    .catch((err) => {
      console.log(err)
      next(err)
    })
  }

  router.param('model', extractModelName)
  router.param('id', extractModelId)

  router.route('/:model') // list of documents for this model
  .get((req, res, next) => {
    db[req['modelName']].find({}).exec()
    .then((objList) => {
      res.status(200).json(objList)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  })
  .post((req, res, next) => { // create a document
    let obj = new db[req['modelName']](req.body)
    obj.save()
    .then((dbObj) => {
      let uri =
        `http://${req.headers['host']}/model/${req['modelName']}/${dbObj.id}`
      console.log(`created: ${dbObj}`)
      res.status(201).location(uri).json(dbObj)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  })

  // search on collection :model
  router.route('/:model/search')
  .post((req, res, next) => {
    db[req['modelName']].find(req['body']).exec()
    .then((objList) => {
      res.status(200).json(objList)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  })

  router.route('/:model/:id')
  .get((req, res, next) => { // get a specific document
    res.status(200).json(req['model'])
  })
  .put((req, res, next) => { // update the model (all model)
    let updatedObj = req.body // accepts only json

    for (let prop in req['model']._doc) {
      if (prop !== '__v' && prop !== '_id') {
        req['model'][prop] = updatedObj[prop]
      }
    }

    req['model'].save()
    .then((newObj) => {
      console.log(`update: ${newObj}`)
      res.status(200).json(newObj)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  })
  .patch((req, res, next) => { // user password case
    // if it's a user patch we set the password with the method
    if (req['modelName'] === 'User' && req['body'].password) {
      req['model'].setPassword(req['body'].password, () => {
        req['body'].password = undefined
        next()
      })
    } else {
      next()
    }
  })
  .patch((req, res, next) => { // update the model (just the parameters found)
    let updatedObj = req['body'] // accepts only json

    // update object
    for (let prop in updatedObj) {
      req['model'][prop] = updatedObj[prop]
    }

    // save the new object in the database and send it in the response
    req['model'].save()
    .then((newObj) => {
      console.log(`update: ${newObj}`)
      res.status(200).json(newObj)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  })
  .delete((req, res, next) => { // delete the model
    req['model'].remove((err) => {
      if (err) {
        console.log(err)
        return next(err)
      }
      console.log(`remove: ${req['model']}`)
      res.status(200).json(req['model'])
    })
  })

  return router
}

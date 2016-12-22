/**
 * Read all JSON formatted files in the config directory
 * @module config
 */
'use strict'

const fs = require('fs')
const path = require('path')

/**
 * Read all the config files .json in the folder
 * and returns an object with the configs
 * namespaced with the filename (w/o extension)
 * @return {Promise<ConfigObject>} Object with the configuration files parsed
 */
function getConfig () {
  const configuration = {}
  const promiseList = []
  return new Promise((resolve, reject) => {
    fs.readdir(__dirname, (err, files) => {
      if (err) { reject(err) }
      for (let file of files) {
        let fp = path.resolve(__dirname, file)
        if (fp === __filename) { continue }
        promiseList.push(addFile(fp, file.replace(/.json/, ''), configuration))
      }
      Promise.all(promiseList)
      .then(() => resolve(configuration))
      .catch(err => reject(err))
    })
  })
}

/**
 * Parse a file and push it in the configuration object
 * @param {string}          filepath      The file path of the file to parse
 * @param {string}          name          Name of the namespace of the configuration
 * @param {Object} configuration          Configuration object
 * @return {Promise<Object>}              File Configuration object
 */
function addFile (filepath, name, configuration) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, obj) => {
      if (err) { reject(err) }
      let current = JSON.parse(obj)
      configuration[name] = current
      resolve(configuration)
    })
  })
}

module.exports = getConfig

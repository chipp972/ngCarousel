/**
 * generate some content to test the app
 */
'use strict'
const getDatabaseConnection = require('../app/models')

getDatabaseConnection()
.then((db) => {
  createContent(db)
  .then((contentList) => createCarousel(db, contentList))
  .then(() => db.connection.close())
  .catch(err => { throw err })
})
.catch(err => { throw err })

function createContent (db) {
  return new Promise((resolve, reject) => {
    db.Content.remove({})
    .then(() => {
      db.Content.create(
        [
          { title: 'vign1', body: 'haha', reference: '1234567890' },
          { title: 'vign2', body: 'hoho', reference: 'a234567890' },
          { title: 'vign3', body: 'huhu', reference: 'b234567890' },
          { title: 'vign4', body: 'hihi', reference: 'c234567890' },
          { title: 'vign5', body: 'hehe', reference: 'd234567890' },
          { title: 'vign6', body: 'hyhy', reference: 'e234567890' },
          { title: 'vign7', body: 'hahaha', reference: 'f234567890' }
        ],
        (err, li) => {
          if (err) { reject(err) }
          resolve(li)
        }
      )
    })
    .catch(err => reject(err))
  })
}

function createCarousel (db, contentList) {
  return new Promise((resolve, reject) => {
    db.Carousel.remove({})
    .then(() => {
      db.Carousel.create(
        [
          {
            name: 'carou1',
            items: contentList.map((obj, index) => {
              return { _id: obj._id, position: index }
            })
          },
          {
            name: 'carou2',
            items: contentList.filter((obj, index) => {
              return index !== 2 && index !== 3
            }).map((obj, index) => {
              return { _id: obj._id, position: index }
            })
          }
        ],
        (err, li) => {
          if (err) { reject(err) }
          resolve(li)
        }
      )
    })
    .catch(err => reject(err))
  })
}

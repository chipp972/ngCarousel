/**
 * generate some content to test the app
 */
'use strict'
const getDatabaseConnection = require('../app/models')

getDatabaseConnection()
.then((db) => {
  createUser(db)
  .then(() => createContent(db))
  .then((contentList) => createCarousel(db, contentList))
  .then(() => db.connection.close())
  .catch(err => { throw err })
})
.catch(err => { throw err })

function createUser (db) {
  return new Promise((resolve, reject) => {
    db.User.remove({})
    .then(() => {
      const admin = { username: 'admin', admin: true }
      db.User.register(admin, 'password', (err, account) => {
        if (err) {
          reject(err)
        }
        resolve(account)
      })
    })
    .catch(err => reject(err))
  })
}

function createContent (db) {
  return new Promise((resolve, reject) => {
    db.Content.remove({})
    .then(() => {
      db.Content.create(
        [
          { title: 'vign1', content: 'haha', reference: '1234567890' },
          { title: 'vign2', content: 'hoho', reference: 'a234567890' },
          { title: 'vign3', content: 'huhu', reference: 'b234567890' },
          { title: 'vign4', content: 'hihi', reference: 'c234567890' },
          { title: 'vign5', content: 'hehe', reference: 'd234567890' },
          { title: 'vign6', content: 'hyhy', reference: 'e234567890' },
          { title: 'vign7', content: 'hahaha', reference: 'f234567890' }
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
            name: 'carou1',
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

/**
 * Content Model tests
 */
'use strict'
const expect = require('chai').expect
const Content = require('../content')

describe('Content', function () {
  it('should not create a content object', function (done) {
    const c = new Content({
      title: 'test1',
      body: 'random content 1',
      reference: '123456789'
    })

    c.validate(function (err) {
      expect(err).to.be.not.null
      done()
    })
  })

  it('should not save 2 contents with the same ref', function (done) {
    const c1 = new Content({ title: 'test1', reference: '1234567890' })
    const c2 = new Content({ title: 'test1', reference: '1234567890' })
    c1.save((err) => {
      expect(err).to.be.null
      console.log('haha')
      c2.save((err) => {
        expect(err).to.be.not.null
        done()
      })
    })
  })
})

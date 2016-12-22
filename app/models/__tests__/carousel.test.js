/**
 * Carousel Model tests
 */
'use strict'
const expect = require('chai').expect
const Carousel = require('../carousel')

describe('Carousel', function () {
  it('should create a carousel', function (done) {
    const c = new Carousel({
      name: 'carou1',
      items: []
    })

    c.validate(function (err) {
      expect(err).to.be.null
      done()
    })
  })
})

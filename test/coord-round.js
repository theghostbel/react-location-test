var test = require('tape')
var rounder = require('../js/coord-round')

test('rounding injection', function(t) {
  t.equal(typeof rounder, 'object', 'roinder should be an object')
  t.end()
})

test('rounding getFloat method', function(t) {
  t.ok(rounder.getFloat, 'member should be present')
  t.equal(typeof rounder.getFloat, 'function', 'member should be a function')
  t.equal(rounder.getFloat(23.8585858585858585), 23.858586)
  t.equal(rounder.getFloat(23), 23.000000)
  t.equal(rounder.getFloat(23.23), 23.230000)
  t.notOk(rounder.getFloat(NaN), 'should return nothing')
  t.end()
})

test('rounding thrower method', function(t) {
  t.ok(rounder.thrower, 'member should be present')
  t.equal(typeof rounder.thrower, 'function', 'member should be a function')
  t.throws(rounder.thrower, Error, 'should throw an Error')
  t.end()
})

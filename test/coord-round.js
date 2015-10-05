var test = require('tape')
var rounder = require('../js/coord-round')

test('rounding test', function(t) {
  t.equal(typeof rounder, 'object', 'should be an object')
  t.equal(rounder.toSix('23.23'), 23.230000, 'My first assertion')
  t.equal(rounder.toSix('23.'), 23.000000, 'My second assertion')
  t.end()
})

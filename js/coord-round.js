exports.toSix = function(number) {

  if (!number) return

  if (typeof number === 'string')
    return number.substring(0, 9)

  return number.toFixed(6)
}

exports.getFloat = function(float) {
  return +(float.toFixed(6))
}

exports.thrower = function() {
  throw new Error('Not a good Idea!')
}

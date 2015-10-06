exports.toSix = function(number) {

  if (!number) return

  if (typeof number === 'string')
    return number.substring(0, 9)

  return number.toFixed(6)
}

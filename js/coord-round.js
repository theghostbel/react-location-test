exports.toSix = function(number){
  var rawNumStr = number,
  rawNum = parseFloat(rawNumStr),
  roundedNum = +(rawNum.toFixed(6))

  return roundedNum || number
}

// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
var geolib = require('geolib')

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

var geo = {
  canBeUsed: function() {
    return navigator && ('geolocation' in navigator)
  },
  getFastCoords: function(success, error) {
    navigator.geolocation.getCurrentPosition(success, error)
  },
  getCoords: function(callback, errorCallback) {
    navigator.geolocation.getCurrentPosition(success, error, options)
  },
  getDistance: function(fromCoords, toCoords, success, error) {
    var distanceInMteres = geolib.getDistance(fromCoords, toCoords)

    return success(distanceInMteres)
  },
  getIsPointInside: function(latlng, coords, success) {
    var isPointInside = geolib.isPointInside(latlng, coords)

    console.log(latlng)
    console.log(coords)
    return success(isPointInside)
  }
}

module.exports = geo

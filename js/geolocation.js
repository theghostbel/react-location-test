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
  /**{latitude: 51.5103, longitude: 7.49347}*/
  getDistance(fromCoords, toCoords, success, error) {
    var distanceInMteres = geolib.getDistance(fromCoords, toCoords)

    success(distanceInMteres)
  }
}

module.exports = geo

// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
var geolib = require('geolib')

var options = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 0
}

var geo = {
  canBeUsed: function() {
    return navigator && ('geolocation' in navigator)
  },
  getFastCoords: function(success, error) {
    navigator.geolocation.getCurrentPosition(success, error)
  },
  getCoords: function(success, error) {
    navigator.geolocation.getCurrentPosition(success, error, options)
  },
  getDistance: function(fromCoords, toCoords, success) {
    var distanceInMteres = geolib.getDistance(fromCoords, toCoords)

    return success(distanceInMteres)
  },
  getIsPointInside: function(latlng, coords, success) {
    var isPointInside = geolib.isPointInside(latlng, coords)

    // [{
    //   latitude: 59.453063,
    //   longitude: 24.671333
    // }, {
    //   latitude: 59.456203,
    //   longitude: 24.717939
    // }, {
    //   latitude: 59.424248,
    //   longitude: 24.736433
    // }, {
    //   latitude: 59.424910,
    //   longitude: 24.664970
    // }]

    return success(isPointInside)
  },
  watchPosition: function(success, error) {
    return navigator.geolocation.watchPosition(success, error, options)
  },
  clearWatcher: function(id) {
    return navigator.geolocation.clearWatch(id)
  }
}

module.exports = geo

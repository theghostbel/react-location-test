// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation

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
  }
}

module.exports = geo

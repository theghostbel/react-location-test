/*global google:false*/

var React = require('react')

var ReactScriptLoaderModule = require('react-script-loader')
var ReactScriptLoaderMixin = ReactScriptLoaderModule.ReactScriptLoaderMixin
var ReactScriptLoader = ReactScriptLoaderModule.ReactScriptLoader

var scriptURL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB-lE0R1V0ti3AjwQvdeK2EPu8p2P5Uu4A&sensor=true&callback=initializeMaps'

// This function is called by the Google maps API after its initialization is
// complete.
// We need to define this function in the window scope to make it accessible
// to the Google maps script.
window.initializeMaps = function() {

  // This triggers the onScriptLoaded method call on all mounted Map components.
  ReactScriptLoader.triggerOnScriptLoaded(scriptURL)
}

module.exports = React.createClass({
  mixins: [ReactScriptLoaderMixin],

  // Ensure that onScriptLoaded is deferred until the
  // ReactScriptLoader.triggerOnScriptLoaded() call above is made in
  // initializeMaps().
  deferOnScriptLoaded: function() {
    return true
  },

  getScriptURL: function() {
    return scriptURL
  },

  onScriptLoaded: function() {
    // Render a map with the center point given by the component's lat and lng
    // properties.

    var lat = this.props.position.coords && this.props.position.coords.latitude,
      long = this.props.position.coords && this.props.position.coords.longitude

    var center = new google.maps
      .LatLng(lat, long)
    var mapOptions = {
      zoom: 14,
      center: center,
      disableDefaultUI: true,
      draggable: true,
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true
    }

    var map = new google.maps
      .Map(this.getDOMNode(), mapOptions)

    this.map = map
  },
  onScriptError: function() {
    // Show the user an error message.
  },

  render: function() {

    var lat = this.props.position.coords && this.props.position.coords.latitude,
      long = this.props.position.coords && this.props.position.coords.longitude,
      imgSrc = 'https://maps.googleapis.com/maps/api/staticmap?center=' + lat + ',' + long + '&zoom=15&size=400x400&sensor=true'

    this.map && this.map
      .setCenter(new google.maps.LatLng(lat, long))

    return (
      <div className="map mapCanvas"></div>
    )
  }
})

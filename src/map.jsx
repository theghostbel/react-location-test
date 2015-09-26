var React = require('react')
var Map = require('react-maps')

module.exports = React.createClass({
  render: function() {

    var lat = this.props.position.coords && this.props.position.coords.latitude,
      long = this.props.position.coords && this.props.position.coords.longitude
      // imgSrc = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + long + "&zoom=13&size=300x300&sensor=true"

    return (
      <Map latitude={lat} longitude={long} zoom={10}/>
    )
  }
})

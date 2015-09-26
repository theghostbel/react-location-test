var React = require('react')

module.exports = React.createClass({
  render: function() {

    var lat = this.props.position.coords && this.props.position.coords.latitude,
      long = this.props.position.coords && this.props.position.coords.longitude,
      imgSrc = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + long + "&zoom=15&size=400x400&sensor=true"

    return (
      <div className="map">
        <div className="coords-row">
          <span className="label label-info coord-unit">{lat}°</span>
          <span className="label label-info coord-unit">{long}°</span>
        </div>
        <div className="map-picture">
          <img src={imgSrc}/>
        </div>
      </div>
    )
  }
})

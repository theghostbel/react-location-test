var React = require('react')

module.exports = React.createClass({
  render: function() {
    var pos = this.props.pos

    if(!pos.coords) return <div>No data</div>
    return <div className="geo-data">
        <div>LAT: {pos.coords.latitude}</div>
        <div>LNG: {pos.coords.longitude}</div>
        <div>ALT: {pos.coords.altitude}</div>
        <div>SPEED: {pos.coords.speed}</div>
      </div>
  }
})

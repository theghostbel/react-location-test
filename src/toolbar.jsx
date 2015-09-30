var React = require('react')
var geo = require('../js/geolocation')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      latitude: null,
      longitude: null,
      reading: false
    }
  },
  componentDidMount: function() {
    this.updateCoords()
  },
  handleButtonClick: function() {
    this.updateCoords()
  },
  updateCoords: function() {
    var self = this,
      state = self.state

    self.setState({
      reading: true
    })

    if (geo.canBeUsed()) {
      geo
        .getCoords(function(pos) {
          self.setState({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            reading: false
          })
          self.props
            .coordsCallback(null, pos)
        }, self.props.coordsCallback)
    }
  },
  render: function() {

    var self = this,
      state = self.state

    return (
      <footer className="toolbar">
        <span className={state.reading
          ? ""
          : "invis"}>Reading</span>
        <button className="btn btn-default btn-lg" onClick={self.handleButtonClick} type="button">Read my location</button>
        <span className="label label-info coord-unit">LAT:{state.latitude}</span>
        <span className="label label-info coord-unit">LONG:{state.longitude}</span>
      </footer>
    )
  }
})

var React = require('react')
var geo = require('../js/geolocation')
var rounder = require('../js/coord-round')

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
  handleSecondaryBtnClick: function() {
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
        }, function(err) {
          self.setState({
            reading: false
          })
          alert([
            'ERROR:', err.message || err.code
          ].join(' '))
        })
    }
  },
  updateCoords: function() {
    var self = this,
      state = self.state

    self.setState({
      reading: true
    })

    if (geo.canBeUsed()) {
      geo
        .getFastCoords(function(pos) {
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
        <button className="btn btn-default" onClick={self.handleButtonClick} type="button">Read my location</button>
        <button className="btn btn-default" onClick={self.handleSecondaryBtnClick} type="button">Long read</button>
        <span className="label label-info coord-unit">LAT:{rounder.toSix(state.latitude)}</span>
        <span className="label label-info coord-unit">LONG:{rounder.toSix(state.longitude)}</span>
      </footer>
    )
  }
})

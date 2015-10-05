var React = require('react')
var geo = require('../js/geolocation')
var rounder = require('../js/coord-round')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      distance: 0,
      destinationLatitude: '59.438216',
      destinationLongitude: '24.700667'
    }
  },
  getDisatnce: function(fromLatlng, toLatlng) {
    var self = this
    geo
      .getDistance(fromLatlng, toLatlng, function(meters) {
        self.setState({
          distance: meters
        })
      })
  },
  handleChange: function(stateFld) {
    var self = this
    return function(event) {
      var stateObj = {}

      stateObj[stateFld] = rounder.toSix(event.target.value)
      self.setState(stateObj)
    }
  },
  handleCalcClick: function() {

    var fromLatlng = {
      latitude: this.props.myPosition.coords.latitude,
      longitude: this.props.myPosition.coords.longitude
    }

    var toLatlng = {
        latitude: this.refs
        .latitude
        .getDOMNode()
        .value,
      longitude: this.refs
        .longitude
        .getDOMNode()
        .value
    }
    // verify coords here

    this.getDisatnce(fromLatlng, toLatlng)
  },
  render: function() {

    var self = this,
      state = self.state

    return <div className="range-finder">
        <span className="label label-primary timestamp">{state.distance}
          Meters</span>
        <input className="coords" onChange={this.handleChange('destinationLatitude')} placeholder="End latitude" ref="latitude" type="text" value={state.destinationLatitude}/>
        <input className="coords" onChange={this.handleChange('destinationLongitude')} placeholder="End longitude" ref="longitude" type="text" value={state.destinationLongitude}/>
        <button className="btn btn-default btn-calc" onClick={self.handleCalcClick} type="button" type="button">Distance</button>
      </div>
  }
})

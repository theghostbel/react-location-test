var React = require('react')
var geo = require('../js/geolocation')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      distance: 0,
      destinationLatitude: '59.4382162',
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

    return <footer className="range-finder">
        <span>{state.distance}
          Meters</span>
        <input className="coords" placeholder="End latitude" ref="latitude" type="text" value={state.destinationLatitude}/>
        <input className="coords" placeholder="End longitude" ref="longitude" type="text" value={state.destinationLongitude}/>
        <button onClick={self.handleCalcClick} type="button">Calc</button>
      </footer>
  }
})

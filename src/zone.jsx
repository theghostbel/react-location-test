var React = require('react')
var ReactFire = require('reactfire')
var Firebase = require('firebase')
var _ = require('underscore')
var geo = require('../js/geolocation')

var rootUrl = 'https://coords4.firebaseio.com/'

module.exports = React.createClass({
  mixins: [ReactFire],
  getInitialState: function() {
    return {
      points: {},
      loading: true,
      inside: false
    }
  },
  componentWillMount: function() {
    var fb = new Firebase([rootUrl, 'coords/'].join(''))

    fb.on('value', this.handleDataLoaded)

    this.bindAsObject(fb, 'points')
    this.fb = fb

    // this.firebaseRefs
    //   .points
    //   .push({
    //     lat: 59.424910,
    //     lng: 24.664970
    //   })

  },
  update: function() {

    var self = this

    if (!this.props.position.coords)
      return

    var latlng = {
      latitude: this.props.position.coords.latitude,
      longitude: this.props.position.coords.longitude
    }

    var coords = _
      .chain(this.state.points)
      .filter(function(val) {
        return val.lat & val.lng
      })
      .map(function(val) {
        return {
          latitude: val.lat,
          longitude: val.lng
        }
      })
      .value()

    geo
      .getIsPointInside(latlng, coords, function(result) {
        self.setState({
          inside: result
        })
      })

  },
  handleDataLoaded: function() {

    this.setState({
      loading: false
    })

  },
  allCoords: function() {

    var list = _
      .chain(this.state.points)
      .filter(function(val) {
        return val.lat & val.lng
      })
      .map(function(val) {
        return <li>{val.lat}
            &nbsp;-&nbsp;
            {val.lng}</li>
      })
      .value()

    return <ul className="zone-list">
        {list}
      </ul>
  },
  render: function() {
    var state = this.state
    return <div className="zone">
        {this.allCoords()}
        <div className="result">inside?
          {' ' + state.inside}</div>
      </div>

  }
})

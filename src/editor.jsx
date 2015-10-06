var React = require('react')
var _ = require('underscore')
var ReactFire = require('reactfire')
var Firebase = require('firebase')
var rounder = require('../js/coord-round')

var rootUrl = 'https://coords4.firebaseio.com/'

var ReactRouter = require('react-router')
var Link = ReactRouter.Link

module.exports = React.createClass({
  mixins: [ReactFire],
  getInitialState: function() {
    return {
      points: {},
      loading: true
    }
  },
  handleDataLoaded: function() {
    this.setState({
      loading: false
    })
  },
  componentWillMount: function() {
    var fb = new Firebase([rootUrl, 'coords/'].join(''))

    fb.on('value', this.handleDataLoaded)

    this.bindAsObject(fb, 'points')
    this.fb = fb
  },
  handleSaveClick: function() {

    this.setState({
      laoding: true
    })

    var update = _.chain(this.state.points)
      .omit(['.key'])
      .map(function(val, key) {
        var data = {
            lat: parseFloat(val.lat),
            lng: parseFloat(val.lng)
          },
          result = {}

        result[key] = data

        return result

      })
      .value()

    // this.fb
    //   .update(update)
  },
  handleInputChange: function(key, type) {
    var self = this
    return function(event) {
      var stateObj = self.state.points

      stateObj[key][type] = rounder.toSix(event.target.value)

      self.setState(stateObj)
    }
  },
  renderAllInputs: function() {

    var range = this.state.points,
      self = this,
      content = _.chain(range)
        .omit(['.key'])
        .map(function(val, key) {
          return self.renderLatLngInput(key)
        })
        .value()

    return content
  },
  renderLatLngInput: function(key) {
    var state = this.state,
      self = this
    return <div className="coord-input-row">
        <input className="coords" onChange={self.handleInputChange(key, 'lat')} placeholder="End latitude" ref="latitude" type="text" value={state.points[key].lat}/>
        <input className="coords" onChange={self.handleInputChange(key, 'lng')} placeholder="End longitude" ref="longitude" type="text" value={state.points[key].lng}/>
      </div>
  },
  render: function() {
    var self = this,
      state = self.state
    return <div>
        <header>
          <Link to={'/'}>Back</Link>
        </header>
        <h3>Edit coords</h3>
        {this.renderAllInputs()}
        <button onClick={this.handleSaveClick}>Save</button>
        <span className={state.loading
          ? ''
          : 'invis'}>Loading</span>
      </div>
  }
})

var React = require('react')
var Header = require('./header')
// var Map = require('./map')
var Toolbar = require('./toolbar')
var RangeFinder = require('./range-finder')
var Zone = require('./zone')

var App = React.createClass({
  getInitialState: function() {
    return {
      pos: {}
    }
  },
  handleCoordsUpdate: function(err, pos) {

    if (err) {
      return console.error('ERROR(' + err.code + '): ' + err.message)
    }

    this.refs
      .zoner
      .update()

    this.setState({
      pos: pos
    })
  },
  render: function() {

    return <div className="react-content">
        <Header updateTime={this.state.pos.timestamp}></Header>
        <RangeFinder myPosition={this.state.pos}></RangeFinder>
        <Zone position={this.state.pos} ref="zoner"></Zone>
        <Toolbar coordsCallback={this.handleCoordsUpdate}></Toolbar>
      </div>
  }
})

var element = React.createElement(App, {})
React.render(element, document.querySelector('.container'))

var React = require('react')
var Header = require('./header')
var Map = require('./map')
var Toolbar = require('./toolbar')

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

    this.setState({
      pos: pos
    })
  },
  render: function() {
    return <div className="react-content">
        <Header updateTime={this.state.pos.timestamp}></Header>
        <Map position={this.state.pos}></Map>
        <Toolbar coordsCallback={this.handleCoordsUpdate}></Toolbar>
      </div>
  }
})

var element = React.createElement(App, {})
React.render(element, document.querySelector('.container'))

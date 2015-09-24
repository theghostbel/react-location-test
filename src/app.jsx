var React = require('React')
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
    this.setState({
      pos: pos
    })
  },
  render: function() {
    return <div className="react-content">
        <Header></Header>
        <Map position={this.state.pos}></Map>
        <Toolbar coordsCallback={this.handleCoordsUpdate}></Toolbar>
      </div>
  }
})

var element = React.createElement(App, {})
React.render(element, document.querySelector('.container'))

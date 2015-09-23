var React = require('React')
var Header = require('./header')
var Map = require('./map')
var Toolbar = require('./toolbar')

var App = React.createClass({
  render: function() {
    return <div className="react-content">
        <Header></Header>
        <Map></Map>
        <Toolbar></Toolbar>
      </div>
  }
})

var element = React.createElement(App, {})
React.render(element, document.querySelector('.container'))

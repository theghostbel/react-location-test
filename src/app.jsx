var React = require('React')
var Header = require('./header')

var App = React.createClass({
  render: function() {
    return <div>
        <Header></Header>
      </div>
  }
})

var element = React.createElement(App, {})
React.render(element, document.querySelector('.container'))

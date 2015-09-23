var React = require('react')

module.exports = React.createClass({
  render: function() {
    return <div className="header">This is my location</div>
  },
  componentWillMount: function() {
    console.log('Header is about to mount')
  },
  componentDidMount: function() {
    console.log('Header is mounted')
  }
})

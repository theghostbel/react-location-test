var React = require('react')

module.exports = React.createClass({
  render: function(){
    return <header className="header">This is my location</header>
  },
  componentWillMount: function(){
    console.log('Header is about to mount')
  },
  componentDidMount: function(){
    console.log('Header is mounted')
  }
})

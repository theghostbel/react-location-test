var React = require('react')
var moment = require('moment')

var ReactRouter = require('react-router')
var Link = ReactRouter.Link

module.exports = React.createClass({
  getInitialState: function() {
    return {
      lastUpdate: null
    }
  },
  render: function() {

    var lastUpdateTime = moment(this.props.updateTime).format('MMMM Do YYYY, HH:mm:ss')

    return <header className="header">
        <span className="label label-success">Last Read</span>
        <span className="label label-primary timestamp">{lastUpdateTime}</span>
        <Link to={'/crm'}>Edit</Link>
        <Link to={'/watch'}>Watch</Link>
      </header>
  }
})

var React = require('react')
var moment = require('moment')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      lastUpdate: null
    }
  },
  render: function() {

    var lastUpdateTime = moment(this.props.updateTime).format('MMMM Do YYYY, HH:mm:ss')

    return <header className="header">
        <span className="label label-primary timestamp">{lastUpdateTime}</span>
      </header>
  }
})

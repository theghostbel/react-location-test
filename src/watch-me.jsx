var React = require('react')
var geo = require('../js/geolocation')

var ReactRouter = require('react-router')
var Link = ReactRouter.Link

module.exports = React.createClass({
  getInitialState: function() {
    return {
      started: false,
      watcher: null,
      data: ''
    }
  },
  buttonHandlerBuilder: function(start) {
    var self = this
    return function() {
      var watcher = self.state.watcher
      if (start) {
        watcher = geo
          .watchPosition(function(pos) {
            self.setState({
              data: [
                pos.coords.latitude, pos.coords.longitude, pos.coords.altitude, pos.coords.speed
              ].join(' | ')
            })
          }, function(err) {
            alert([
              'ERROR:', err.message || err.code
            ].join(' '))
          })
      } else {
        geo.clearWatcher(watcher)
      }

      self.setState({
        started: start,
        watcher: watcher
      })
    }
  },
  componentWillUnmount: function() {
    geo.clearWatcher(this.state.watcher)
  },
  render: function() {
    var self = this,
      state = self.state
    return <div>
        <header>
          <Link to={'/'}>Back</Link>
        </header>
        <div className={'watcher updated ' + (state.started
          ? ''
          : 'unavailable')}>
          <span>{state.data || ''}</span>
        </div>
        <div className="buttons">
          <button disabled={state.started} onClick={self.buttonHandlerBuilder(true)}>Start Watch</button>
          <button disabled={!state.started} onClick={self.buttonHandlerBuilder(false)}>Stop Watch</button>
        </div>
      </div>
  }
})

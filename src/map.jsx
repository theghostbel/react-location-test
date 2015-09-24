var React = require('react')

module.exports = React.createClass({
  render: function() {
    return (
      <div className="map">
        Map here
        <span className="label label-info coord-unit">{this.props.position.coords && this.props.position.coords.latitude}</span>
        <span className="label label-info coord-unit">{this.props.position.coords && this.props.position.coords.longitude}</span>
      </div>
    )
  }
})

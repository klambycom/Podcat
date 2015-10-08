var React = require('react');

var NotFound = React.createClass({
  render: function () {
    return (
        <div id="not-found">
          <h1>404</h1>
          <p>{this.props.children}</p>
        </div>
        );
  }
});

module.exports = NotFound;

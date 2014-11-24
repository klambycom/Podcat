/** @jsx React.DOM */

var React = require('react');

var NotFound = React.createClass({
  render: function () {
    return (
        <div id="not-found">
          <h2>404</h2>
          <p>Not found!</p>
        </div>
        );
  }
});

module.exports = NotFound;

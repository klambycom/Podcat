/** @jsx React.DOM */

var React = require('react');

var App = React.createClass({
  render: function () {
    return (
        <div>
          <h1>Hello, world!</h1>
          <p>Sidan har visats gånger.</p>
        </div>
        );
  }
});

module.exports = App;

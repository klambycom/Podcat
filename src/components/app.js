/** @jsx React.DOM */

var React = require('react');
var Counter = require('./counter');

var App = React.createClass({
  render: function () {
    return (
        <div>
          <h1>Hello, world!</h1>
          <p>Sidan har visats <Counter /> gånger.</p>
        </div>
        );
  }
});

module.exports = App;

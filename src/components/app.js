var React = require('react');
var Counter = require('./counter');

var App = React.createClass({
  render: function () {
    return (
        <div>
          <h1>Hello, world!</h1>
          <p>Antal besök är <Counter /> st.</p>
        </div>
        );
  }
});

module.exports = App;

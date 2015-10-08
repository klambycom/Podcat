var React = require('react');
var Player = require('./player');
var Navigation = require('./navigation');
var Sidebar = require('./sidebar');
var Alert = require('./alert');

var App = React.createClass({
  render: function () {
    return (
        <div>
          <Navigation />
          <Alert />
          <div className="float-left">
            {this.props.children}
          </div>
          <div className="float-right">
            <Player />
            <Sidebar />
          </div>
          <div id='footer'></div>
        </div>
        );
  }
});

module.exports = App;

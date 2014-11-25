/** @jsx React.DOM */

var React = require('react');
var Player = require('./player');
var Navigation = require('./navigation');
var Sidebar = require('./sidebar');
var RouteHandler = require('react-router').RouteHandler;

var App = React.createClass({
  render: function () {
    return (
        <div>
          <Navigation />
          <div className="float-left">
            <RouteHandler />
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

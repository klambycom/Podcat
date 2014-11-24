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
          <Player />
          <RouteHandler />
          <Sidebar />
        </div>
        );
  }
});

module.exports = App;

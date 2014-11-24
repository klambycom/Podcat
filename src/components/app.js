/** @jsx React.DOM */

var React = require('react');
var Player = require('./player');
var Playlist = require('./playlist');
var Feed = require('./feed');
var Navigation = require('./navigation');
var Sidebar = require('./sidebar');

var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;

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

/** @jsx React.DOM */

var React = require('react');
var Player = require('./player');
var Playlist = require('./playlist');
var Feed = require('./feed');
var Navigation = require('./navigation');

var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;

var App = React.createClass({
  render: function () {
    return (
        <div>
          <h1>Podcat</h1>
          <Player />
          <Navigation />
          <RouteHandler />
        </div>
        );
  }
});

module.exports = App;

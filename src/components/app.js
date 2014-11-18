/** @jsx React.DOM */

var React = require('react');
var Player = require('./player');
var Playlist = require('./playlist');
var Feed = require('./feed');

var App = React.createClass({
  render: function () {
    return (
        <div>
          <h1>Podcat</h1>
          <Player />
          <h2>Playlist</h2>
          <Playlist />
          <h2>Feed</h2>
          <Feed />
        </div>
        );
  }
});

module.exports = App;

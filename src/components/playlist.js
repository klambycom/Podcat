/** @jsx React.DOM */

var React = require('react');
var Reflux = require('reflux');
var PlaylistStore = require('../playlist_store.js');

var Playlist = React.createClass({
  render: function () {
    return (
        <div id="playlist">Playlist</div>
        );
  }
});

module.exports = Playlist;

/** @jsx React.DOM */

var React = require('react');
var Reflux = require('reflux');
var playlistStore = require('../playlist_store.js');

var Player = React.createClass({
  mixins: [Reflux.ListenerMixin],
  componentDidMount: function () {
    this.listenTo(playlistStore, this.onPlay);
  },
  onPlay: function (episode) {
    console.log(episode);
  },
  render: function () {
    return (
        <div id="player">Player</div>
        );
  }
});

module.exports = Player;

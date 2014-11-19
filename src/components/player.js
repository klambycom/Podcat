/** @jsx React.DOM */

var React = require('react');
var Reflux = require('reflux');
var playlistStore = require('../playlist_store.js');

var Player = React.createClass({
  mixins: [Reflux.ListenerMixin],
  componentDidMount: function () {
    this.audio = new Audio();
    this.listenTo(playlistStore, this.onPlay);
  },
  onPlay: function (e) {
    // Load new episode
    if (e && e.audio_url) {
      this.audio = new Audio(e.audio_url);
    } else {
      e.preventDefault();
    }

    // Play
    this.audio.play();
  },
  render: function () {
    return (
        <div id="player">
          <a href="#" onClick={this.onPlay}>Play</a>
        </div>
        );
  }
});

module.exports = Player;

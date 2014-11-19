/** @jsx React.DOM */

var React = require('react');
var Reflux = require('reflux');
var store = require('../playlist_store.js');
var actions = require('../playlist_actions.js');

var Player = React.createClass({
  mixins: [Reflux.ListenerMixin],
  componentDidMount: function () {
    this.audio = new Audio();
    this.listenTo(actions.play, this.onPlay);
  },
  onPlay: function (episode) {
    this.audio.src = episode.audio_url;
    this.audio.play();
  },
  clickPlay: function (e) {
    this.audio.play();
    e.preventDefault();
  },
  clickPause: function (e) {
    this.audio.pause();
    e.preventDefault();
  },
  render: function () {
    return (
        <div id="player">
          <a href="#" onClick={this.clickPlay}>Play</a> :
          : <a href="#" onClick={this.clickPause}>Pause</a>
        </div>
        );
  }
});

module.exports = Player;

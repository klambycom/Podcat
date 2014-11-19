/** @jsx React.DOM */

var React = require('react');
var Reflux = require('reflux');
var store = require('../playlist_store.js');
var actions = require('../playlist_actions.js');

var Player = React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState: function () {
    return {
      image: '',
      title: ''
    };
  },
  componentDidMount: function () {
    this.audio = new Audio();
    this.listenTo(actions.play, this.onPlay);
  },
  onPlay: function (episode) {
    this.audio.src = episode.audio_url;
    this.audio.play();
    this.setState({
      title: episode.title,
      image: episode.image
    });
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
          <div className="image"><img src={this.state.image} /></div>
          <div className="title">{this.state.title}</div>
          <div className="controlls">
            <a href="#" onClick={this.clickPlay}>Play</a> :
            : <a href="#" onClick={this.clickPause}>Pause</a>
          </div>
        </div>
        );
  }
});

module.exports = Player;

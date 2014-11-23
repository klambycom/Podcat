/** @jsx React.DOM */

var React = require('react');
var PlayPause = require('./play_pause.js');
var Previous = require('./previous.js');
var Next = require('./next.js');

var Reflux = require('reflux');
var PlaylistStore = require('../reflux/playlist_store.js');
var PlayerActions = require('../reflux/player_actions.js');

var storage = require('../playlist_storage.js');

var Player = React.createClass({
  mixins: [Reflux.listenTo(PlaylistStore, 'onPlay')],
  getInitialState: function () {
    return {
      image: '',
      title: ''
    };
  },
  componentDidMount: function () {
    // Load first episode from saved playlist
    this.changeEpisode(storage.all(), false);
  },
  onPlay: function (episode) {
    this.changeEpisode(episode, true);
  },
  changeEpisode: function (items, autoplay) {
    if (items.length === 0) { return; }

    // Change episode if playlist is not empty
    this.setState({
      title: items[0].title,
      image: items[0].image
    });
    PlayerActions.play(items[0].audio_url, autoplay);
  },
  render: function () {
    return (
        <div id="player">
          <div className="image"><img src={this.state.image} /></div>
          <div className="title">{this.state.title}</div>
          <div className="controls"><Previous /> <PlayPause /> <Next /></div>
        </div>
        );
  }
});

module.exports = Player;

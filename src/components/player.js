/** @jsx React.DOM */

var React = require('react');
var PlayPause = require('./play_pause.js');
var Previous = require('./previous.js');
var Next = require('./next.js');
var ProgressBar = require('./progress_bar.js');

var Reflux = require('reflux');
var PlaylistStore = require('../reflux/playlist_store.js');
var ProgressBarStore = require('../reflux/progress_bar_store.js');
var PlayerActions = require('../reflux/player_actions.js');

var storage = require('../playlist_storage.js');

var Player = React.createClass({
  mixins: [
    Reflux.listenTo(PlaylistStore, 'onPlay'),
    Reflux.listenTo(ProgressBarStore, 'onTimeUpdate')
  ],
  getInitialState: function () {
    return {
      image: '',
      title: '',
      playing: false,
      nearEnd: false,
      nextEpisode: {}
    };
  },
  componentDidMount: function () {
    // Load first episode from saved playlist
    this.changeEpisode(storage.all(), false);
  },
  onTimeUpdate: function (data) {
    // Get information about next episode, if only a couple of seconds left on
    // this episode
    if (typeof data.nearEnd !== "undefined" && data.nextEpisode.title) {
      this.setState({ nearEnd: !!data.nearEnd, nextEpisode: data.nextEpisode });
    }
  },
  onPlay: function (episode, type) {
    this.changeEpisode(episode, type !== 'add');
  },
  changeEpisode: function (items, autoplay) {
    if (items.length === 0) { return; }

    // Change episode if playlist is not empty
    this.setState({
      title: items[0].title,
      image: items[0].image,
      playing: true
    });
    PlayerActions.play(items[0].audio_url, autoplay);
  },
  render: function () {
    var hide = this.state.playing ? '': 'hide';
    var nextEpisode = this.state.nearEnd ? 'next-episode' : 'next-episode hide';

    return (
        <div>
          <div id="player" className={hide}>
            <div className="image"><img src={this.state.image} /></div>
            <div className="title">{this.state.title}</div>
            <ProgressBar />
            <div className="controls"><Previous /> <PlayPause /> <Next /></div>
          </div>
          <div className={nextEpisode}>
            <span className="title">Next:</span> {this.state.nextEpisode.title}
          </div>
        </div>
        );
  }
});

module.exports = Player;

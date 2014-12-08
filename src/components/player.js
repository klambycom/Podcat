/** @jsx React.DOM */

var React = require('react');
var PlayPause = require('./play_pause.js');
var Previous = require('./previous.js');
var Next = require('./next.js');

var Reflux = require('reflux');
var PlaylistStore = require('../reflux/playlist_store.js');
var PlayerActions = require('../reflux/player_actions.js');

var storage = require('../playlist_storage.js');
var AudioPlayer = require('../audio_player.js');

var Player = React.createClass({
  mixins: [Reflux.listenTo(PlaylistStore, 'onPlay')],
  getInitialState: function () {
    return {
      image: '',
      title: '',
      playing: false,
      bufferedPercent: 0,
      timePercent: 0
    };
  },
  componentDidMount: function () {
    // Load first episode from saved playlist
    this.changeEpisode(storage.all(), false);
    // Update progress bar using progress and timeupdate event
    AudioPlayer.addEventListener('progress', this.updateProgress);
    AudioPlayer.addEventListener('timeupdate', this.updateProgress);
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
  updateProgress: function (e) {
    // Get buffered percent
    var buffered = 0;
    if (AudioPlayer.buffered.length > 0) {
      buffered = AudioPlayer.buffered.end(0) / AudioPlayer.duration * 100;
    }
    // Get current time
    var time = AudioPlayer.currentTime / AudioPlayer.duration * 100;
    // Update state
    this.setState({ bufferedPercent: buffered, timePercent: time });
  },
  render: function () {
    var hide = this.state.playing ? '': 'hide';

    return (
        <div id="player" className={hide}>
          <div className="image"><img src={this.state.image} /></div>
          <div className="title">{this.state.title}</div>
          <div className="progress">
            <div className="buffered">Buffered: {this.state.bufferedPercent}%</div>
            <div className="time">Time: {this.state.timePercent}%</div>
          </div>
          <div className="controls"><Previous /> <PlayPause /> <Next /></div>
        </div>
        );
  }
});

module.exports = Player;

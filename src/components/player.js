/** @jsx React.DOM */

var React = require('react');
var PlayPause = require('./play_pause.js');
var ProgressBar = require('./progress_bar.js');

var Reflux = require('reflux');
var ProgressBarStore = require('../reflux/progress_bar_store.js');
var PlayerActions = require('../reflux/player_actions.js');
var PlaylistActions = require('../reflux/playlist_actions.js');
var PlaylistStore = require('../reflux/playlist_store.js');

var storage = require('../playlist_storage.js');

var Player = React.createClass({
  mixins: [
    Reflux.listenTo(PlaylistStore, 'onPlay'),
    Reflux.listenTo(ProgressBarStore, 'onTimeUpdate')
  ],
  getInitialState: function () {
    return { image: '', title: '', playing: false, nearEnd: false, nextEpisode: {} };
  },
  componentDidMount: function () {
    // Load first episode from saved playlist
    this.changeEpisode(storage.all(), false);
  },
  onTimeUpdate: function (data) {
    // Get information about next episode, if only a couple of seconds left on
    // this episode and there is a next episode
    if (typeof data.nearEnd !== "undefined") {
      this.setState({ nearEnd: false });

      if (data.nextEpisode && data.nextEpisode.title) {
        this.setState({ nearEnd: !!data.nearEnd, nextEpisode: data.nextEpisode });
      }
    }
  },
  onPlay: function (episode, type) {
    this.changeEpisode(episode, (type !== 'add' && type !== 'remove' && type !== 'move'));
  },
  changeEpisode: function (items, autoplay) {
    // Stop playing if playlist is empty
    if (items.length === 0) {
      this.setState({ playing: false });
      return;
    }

    // Change episode if playlist is not empty
    this.setState({
      title: items[0].title,
      playing: true
    });
    PlayerActions.play(items[0].audio_url, autoplay);

    // Find cover image
    var img = new Image();
    img.addEventListener('load', function () {
      this.setState({ image: items[0].image.episode });
    }.bind(this));
    img.addEventListener('error', function () {
      this.setState({ image: items[0].image.podcast });
    }.bind(this));
    img.src = items[0].image.episode;
  },
  handlePrevious: function (e) {
    PlaylistActions.previous();
    e.preventDefault();
  },
  handleNext: function (e) {
    PlaylistActions.next();
    e.preventDefault();
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
            <div className="controls">
              <a href="#" onClick={this.handlePrevious} className="fa fa-fast-backward"></a>
              <PlayPause />
              <a href="#" onClick={this.handleNext} className="fa fa-fast-forward"></a>
            </div>
          </div>
          <div className={nextEpisode}>
            <span className="title">Next:</span> {this.state.nextEpisode.title}
          </div>
        </div>
        );
  }
});

module.exports = Player;

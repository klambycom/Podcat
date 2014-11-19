/** @jsx React.DOM */

var React = require('react');
var PlayPause = require('./play_pause.js');
var Previous = require('./previous.js');
var Next = require('./next.js');

var Reflux = require('reflux');
var PlaylistStore = require('../reflux/playlist_store.js');

var storage = require('../playlist_storage.js');

var Player = React.createClass({
  mixins: [Reflux.listenTo(PlaylistStore, 'onPlay')],
  getInitialState: function () {
    return {
      image: '',
      title: '',
      autoplay: false
    };
  },
  componentWillMount: function () {
    this.audio = new Audio();
  },
  componentDidMount: function () {
    // Load first episode from saved playlist
    storage.all(this.changeEpisode);
  },
  onPlay: function (episode) {
    if (this.audio.src !== episode[0].audio_url) {
      this.changeEpisode(episode, true);
      this.audio.play();
    }
  },
  changeEpisode: function (items, autoplay) {
    this.setState({
      title: items[0].title,
      image: items[0].image,
      autoplay: !!autoplay
    });
    this.audio.src = items[0].audio_url;
  },
  render: function () {
    return (
        <div id="player">
          <div className="image"><img src={this.state.image} /></div>
          <div className="title">{this.state.title}</div>
          <div className="controls">
            <Previous />
            <PlayPause autoplay={this.state.autoplay} player={this.audio} />
            <Next />
          </div>
        </div>
        );
  }
});

module.exports = Player;

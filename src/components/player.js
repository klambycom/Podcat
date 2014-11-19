/** @jsx React.DOM */

var React = require('react');
var PlayPause = require('./play_pause.js');

var Reflux = require('reflux');
var PlaylistStore = require('../reflux/playlist_store.js');
var PlaylistActions = require('../reflux/playlist_actions.js');

var storage = require('../playlist_storage.js');

var Player = React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState: function () {
    return {
      image: '',
      title: '',
      autoplay: false
    };
  },
  componentDidMount: function () {
    this.audio = new Audio();
    this.listenTo(PlaylistStore, this.onPlay);

    // Load first episode from saved playlist
    storage.all(function (result) {
      this.setState({
        title: result[0].title,
        image: result[0].image
      });
      this.audio.src = result[0].audio_url;
    }.bind(this));
  },
  onPlay: function (episode) {
    if (this.audio.src !== episode[0].audio_url) {
      this.audio.src = episode[0].audio_url;
      this.audio.play();
      this.setState({
        title: episode[0].title,
        image: episode[0].image,
        autoplay: true
      });
    }
  },
  play: function () {
    this.audio.play();
  },
  pause: function () {
    this.audio.pause();
  },
  clickNext: function (e) {
    PlaylistActions.next();
    e.preventDefault();
  },
  render: function () {
    return (
        <div id="player">
          <div className="image"><img src={this.state.image} /></div>
          <div className="title">{this.state.title}</div>
          <div className="controls">
            <a href="#" className="fa fa-fast-backward"></a>
            <PlayPause
              autoplay={this.state.autoplay}
              onPlay={this.play}
              onPause={this.pause} />
            <a href="#" onClick={this.clickNext} className="fa fa-fast-forward"></a>
          </div>
        </div>
        );
  }
});

module.exports = Player;

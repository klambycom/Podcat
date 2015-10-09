import React from 'react';
import PlayPause from './play_pause.js';
import ProgressBar from './progress_bar.js';

import Reflux from 'reflux';
import * as ProgressBarFlux from '../reflux/progress_bar.js';
import * as Player from '../reflux/player.js';
import * as Playlist from '../reflux/playlist.js';

import storage from '../playlist_storage.js';

export default React.createClass({
  name: 'Player',

  mixins: [
    Reflux.listenTo(Playlist.store, 'onPlay'),
    Reflux.listenTo(ProgressBarFlux.store, 'onTimeUpdate')
  ],

  getInitialState() {
    return { image: '', title: '', playing: false, nearEnd: false, nextEpisode: {} };
  },

  componentDidMount() {
    // Load first episode from saved playlist
    this.changeEpisode(storage.all(), false);
  },

  onTimeUpdate(data) {
    // Get information about next episode, if only a couple of seconds left on
    // this episode and there is a next episode
    if (typeof data.nearEnd !== "undefined") {
      this.setState({ nearEnd: false });

      if (data.nextEpisode && data.nextEpisode.title) {
        this.setState({ nearEnd: !!data.nearEnd, nextEpisode: data.nextEpisode });
      }
    }
  },

  onPlay(episode, type) {
    this.changeEpisode(episode, (type !== 'add' && type !== 'remove' && type !== 'move'));
  },

  changeEpisode(items, autoplay) {
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
    Player.actions.play(items[0].audio_url, autoplay);

    // Find cover image
    let img = new Image();
    img.addEventListener('load', function () {
      this.setState({ image: items[0].image.episode });
    }.bind(this));
    img.addEventListener('error', function () {
      this.setState({ image: items[0].image.podcast });
    }.bind(this));
    img.src = items[0].image.episode;
  },

  handlePrevious(e) {
    Playlist.actions.previous();
    e.preventDefault();
  },

  handleNext(e) {
    Playlist.actions.next();
    e.preventDefault();
  },

  render() {
    let hide = this.state.playing ? '': 'hide';
    let nextEpisode = this.state.nearEnd ? 'next-episode' : 'next-episode hide';

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

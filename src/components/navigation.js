import React from 'react';
import { Link, IndexLink } from 'react-router';
import Reflux from 'reflux';
import * as Playlist from '../reflux/playlist.js';

export default React.createClass({
  name: 'Navigation',

  mixins: [Reflux.listenTo(Playlist.store, 'onChangeInPlaylist')],

  getInitialState() {
    return { playlistClass: '' };
  },

  onChangeInPlaylist(_, e) {
    // If episode have been added
    if (e === 'add') {
      // Highlight playlist link
      this.setState({ playlistClass: 'highlight' });
      // Remove highlight after a half second
      setTimeout(function () {
        this.setState({ playlistClass: '' });
      }.bind(this), 500);
    }
  },

  render() {
    return (
        <div id="navigation">
          <div className='title'><IndexLink to='/' activeClassName='active'>Ninja Podcat</IndexLink></div>
          <ul className='links'>
            <li><IndexLink to='/' activeClassName='active'>Explore</IndexLink></li>
            <li><Link
                  to='/playlist'
                  id='playlist-link'
                  activeClassName='active'
                  className={this.state.playlistClass}>Playlist</Link></li>
            <li><Link to='/feed' activeClassName='active'>Feed</Link></li>
          </ul>
        </div>
        );
  }
});

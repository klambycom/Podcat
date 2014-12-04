/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router').Link;
var Reflux = require('reflux');
var PlaylistStore = require('../reflux/playlist_store.js');

var Navigation = React.createClass({
  mixins: [Reflux.listenTo(PlaylistStore, 'onChangeInPlaylist')],
  getInitialState: function () {
    return { playlistClass: '' };
  },
  onChangeInPlaylist: function (_, e) {
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
  render: function () {
    return (
        <div id="navigation">
          <div className='title'><Link to='/'>Ninja Podcat</Link></div>
          <ul className='links'>
            <li><Link to='/'>Explore</Link></li>
            <li><Link
                  to='playlist'
                  id='playlist-link'
                  className={this.state.playlistClass}>Playlist</Link></li>
            <li><Link to='feed'>Feed</Link></li>
          </ul>
        </div>
        );
  }
});

module.exports = Navigation;

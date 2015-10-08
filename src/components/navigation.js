var React = require('react');
var Link = require('react-router').Link;
var IndexLink = require('react-router').IndexLink;
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

module.exports = Navigation;

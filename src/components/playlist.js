/** @jsx React.DOM */

var React = require('react');
var Episode = require('./episode');
var Link = require('react-router').Link;

var Reflux = require('reflux');
var PlaylistStore = require('../reflux/playlist_store.js');

var storage = require('../playlist_storage.js');

var Playlist = React.createClass({
  mixins: [Reflux.listenTo(PlaylistStore, 'onChange')],
  getInitialState: function () {
    return { items: [] };
  },
  componentDidMount: function () {
    this.setState({ items: storage.all() });
  },
  onChange: function (items) {
    this.setState({ items: items });
  },
  render: function () {
    // No queued episodes
    var episodes = (
        <div>
          No episodes queued, add from <Link to="feed">the feed</Link>.
        </div>
        );

    // List queued episodes
    if (this.state.items.length > 0) {
      episodes = this.state.items.map(function (item, i) {
        return <Episode key={i} data={item} play={i !== 0} add={false} />;
      });
    }

    return (
        <div id="playlist">
          <h1>Playlist</h1>
          {episodes}
        </div>
        );
  }
});

module.exports = Playlist;

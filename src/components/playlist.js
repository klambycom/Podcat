/** @jsx React.DOM */

var React = require('react');
var Episode = require('./episode');

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
    return (
        <div id="playlist">
          <h1>Playlist</h1>
          {this.state.items.map(function (item, i) {
            return (
                <Episode
                  key={i}
                  title={item.title}
                  image={item.image}
                  audio_url={item.audio_url}
                  play={i !== 0}
                  add={false} />
                );
          }, this)}
        </div>
        );
  }
});

module.exports = Playlist;

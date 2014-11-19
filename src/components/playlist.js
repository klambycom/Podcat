/** @jsx React.DOM */

var React = require('react');
var Episode = require('./episode');

var Reflux = require('reflux');
var playlistStore = require('../playlist_store.js');
var playlistStorage = require('../playlist_storage.js');

var Playlist = React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState: function () {
    return { items: [] };
  },
  componentDidMount: function () {
    playlistStorage.all(function (result) {
      this.setState({ items: result });
    }.bind(this));

    this.listenTo(playlistStore, this.onPlay);
  },
  onPlay: function (current, all) {
    this.setState({ items: all });
  },
  render: function () {
    return (
        <div id="playlist">
          {this.state.items.map(function (item, i) {
            return (
                <Episode
                  key={i}
                  title={item.title}
                  image={item.image}
                  audio_url={item.audio_url}
                  play={i !== 0} />
                );
          }, this)}
        </div>
        );
  }
});

module.exports = Playlist;

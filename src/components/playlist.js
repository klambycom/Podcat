/** @jsx React.DOM */

var React = require('react');
var Reflux = require('reflux');
var playlistStore = require('../playlist_store.js');
var localforage = require('localforage');
var Episode = require('./episode');

var Playlist = React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState: function () {
    return { items: [] };
  },
  componentDidMount: function () {
    localforage
      .getItem('playlist.queue')
      .then(function (result, error) {
        if (error || !(typeof result !== 'undefined' && result.length > 0)) {
          this.setState({ items: [] });
        } else {
          this.setState({ items: result });
        }
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
                  audio_url={item.audio_url} />
                );
          }, this)}
        </div>
        );
  }
});

module.exports = Playlist;

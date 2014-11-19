/** @jsx React.DOM */

var React = require('react');
var Episode = require('./episode');

var Reflux = require('reflux');
var PlaylistStore = require('../reflux/playlist_store.js');

var storage = require('../playlist_storage.js');

var Playlist = React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState: function () {
    return { items: [] };
  },
  componentDidMount: function () {
    storage.all(function (result) {
      this.setState({ items: result });
    }.bind(this));

    this.listenTo(PlaylistStore, this.onChange);
  },
  onChange: function (items) {
    this.setState({ items: items });
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

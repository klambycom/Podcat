import React from 'react';
import Episode from './episode';
import { Link } from 'react-router';

import Reflux from 'reflux';
import PlaylistStore from '../reflux/playlist_store.js';

import storage from '../playlist_storage.js';

export default React.createClass({
  name: 'Playlist',

  mixins: [Reflux.listenTo(PlaylistStore, 'onChange')],

  getInitialState() {
    return { items: [] };
  },

  componentDidMount() {
    this.setState({ items: storage.all() });
  },

  onChange(items) {
    this.setState({ items: items });
  },

  render() {
    // No queued episodes
    let episodes = (
        <div>
          No episodes queued, add from <Link to="/feed">the feed</Link>.
        </div>
        );

    // List queued episodes
    if (this.state.items.length > 0) {
      episodes = this.state.items.map(function (item, i) {
        return (
            <Episode
              key={i}
              compact={true}
              data={item}
              play={i !== 0}
              draggable={i !== 0}
              add={false}
              remove={i !== 0} />);
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

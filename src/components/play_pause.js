import React from 'react';

import Reflux from 'reflux';
import PlayerActions from '../reflux/player_actions.js';
import PlayerStore from '../reflux/player_store.js';

export default React.createClass({
  name: 'PlayPause',

  mixins: [Reflux.listenTo(PlayerStore, 'onChange')],

  getInitialState() {
    return { play: false };
  },

  onChange(state) {
    this.setState({ play: state });
  },

  handleClick(e) {
    PlayerActions.toggle();
    e.preventDefault();
  },

  render() {
    if (this.state.play) {
      return (<a href="#" onClick={this.handleClick} className="fa fa-pause"></a>);
    } else {
      return (<a href="#" onClick={this.handleClick} className="fa fa-play"></a>);
    }
  }
});

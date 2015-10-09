import React from 'react';
import Reflux from 'reflux';
import * as Player from '../reflux/player.js';

export default React.createClass({
  name: 'PlayPause',

  mixins: [Reflux.listenTo(Player.store, 'onChange')],

  getInitialState() {
    return { play: false };
  },

  onChange(state) {
    this.setState({ play: state });
  },

  handleClick(e) {
    Player.actions.toggle();
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

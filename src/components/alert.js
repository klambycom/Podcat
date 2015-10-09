import React from 'react';
import Reflux from 'reflux';
import * as Alert from '../reflux/alert.js';
import * as Player from '../reflux/player.js';

export default React.createClass({
  name: 'Alert',

  mixins: [Reflux.listenTo(Alert.store, 'onAlert')],

  getInitialState() {
    return { type: 'hide', title: '', message: '', source: '' };
  },

  onAlert(obj) {
    this.setState(obj);
  },

  handleClose(e) {
    this.setState({ type: 'hide' });
    e.preventDefault();
  },

  handleReload(e) {
    this.setState({ type: 'hide' });
    Player.actions.reload();
    e.preventDefault();
  },

  render() {
    let more = '';
    if (this.state.source === 'player.src') {
      more = <a href="#" onClick={this.handleReload}>Try to reload</a>;
    }

    return (
        <div id="alert" className={this.state.type}>
          <a href="#" onClick={this.handleClose} className="fa fa-close close"></a> {' '}
          <strong>{this.state.title}</strong> {' '}
          {this.state.message} {more}
        </div>
        );
  }
});

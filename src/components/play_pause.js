/** @jsx React.DOM */

var React = require('react');

var Reflux = require('reflux');
var PlayerActions = require('../reflux/player_actions.js');
var PlayerStore = require('../reflux/player_store.js');

var PlayPause = React.createClass({
  mixins: [Reflux.listenTo(PlayerStore, 'onChange')],
  getInitialState: function () {
    return { play: false };
  },
  onChange: function (state) {
    this.setState({ play: state });
  },
  onClick: function (e) {
    PlayerActions.toggle();
    e.preventDefault();
  },
  render: function () {
    if (this.state.play) {
      return (<a href="#" onClick={this.onClick} className="fa fa-pause"></a>);
    } else {
      return (<a href="#" onClick={this.onClick} className="fa fa-play"></a>);
    }
  }
});

module.exports = PlayPause;

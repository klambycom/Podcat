var React = require('react');
var Reflux = require('reflux');
var AlertStore = require('../reflux/alert.js').store;
var PlayerActions = require('../reflux/player_actions.js');

var Alert = React.createClass({
  mixins: [Reflux.listenTo(AlertStore, 'onAlert')],
  getInitialState: function () {
    return { type: 'hide', title: '', message: '', source: '' };
  },
  onAlert: function (obj) {
    this.setState(obj);
  },
  handleClose: function (e) {
    this.setState({ type: 'hide' });
    e.preventDefault();
  },
  handleReload: function (e) {
    this.setState({ type: 'hide' });
    PlayerActions.reload();
    e.preventDefault();
  },
  render: function () {
    var more = '';
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

module.exports = Alert;

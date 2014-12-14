/** @jsx React.DOM */

var React = require('react');
var Reflux = require('reflux');
var AlertStore = require('../reflux/alert.js').store;

var Alert = React.createClass({
  mixins: [Reflux.listenTo(AlertStore, 'onAlert')],
  getInitialState: function () {
    return { type: 'hide', title: '', message: '' };
  },
  onAlert: function (obj) {
    this.setState(obj);
  },
  handleClose: function (e) {
    this.setState({ type: 'hide' });
    e.preventDefault();
  },
  render: function () {
    return (
        <div id="alert" className={this.state.type}>
          <a href="#" onClick={this.handleClose} className="fa fa-close close"></a> {' '}
          <strong>{this.state.title}</strong> {' '}
          {this.state.message}
        </div>
        );
  }
});

module.exports = Alert;

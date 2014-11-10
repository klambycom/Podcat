/** @jsx React.DOM */

var React = require('react');
var Firebase = require('firebase');

var Counter = React.createClass({
  getInitialState: function () {
    return {
      nr_of_visits: 0
    };
  },
  incrementCounter: function () {
    this.ref.transaction(function (current_value) {
      return (current_value || 0) + 1;
    });
  },
  onSuccess: function (result) {
    this.setState({ nr_of_visits: result.val() });
  },
  onError: function (error) {
    console.log(error.code);
  },
  componentDidMount: function () {
    // Firebase ref
    this.ref = new Firebase('https://blinding-torch-6567.firebaseio.com/').child('counter');

    // Add new visitor to Firebase
    this.incrementCounter();

    // Get updates from Firebase
    this.ref.on('value', this.onSuccess, this.onError);
  },
  componentWillUnmount: function () {
    this.ref.off('value', this.onSetCounter);
  },
  render: function () {
    return (<span className='counter'>{this.state.nr_of_visits}</span>);
  }
});

module.exports = Counter;

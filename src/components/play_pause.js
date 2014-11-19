/** @jsx React.DOM */

var React = require('react');

var PlayPause = React.createClass({
  getDefaultProps: function () {
    return {
      autoplay: false
    };
  },
  propTypes: {
    autoplay: React.PropTypes.bool,
    onPlay: React.PropTypes.func.isRequired,
    onPause: React.PropTypes.func.isRequired
  },
  getInitialState: function () {
    return {
      play: this.props.autoplay
    };
  },
  componentWillReceiveProps: function (props) {
    this.setState({ play: props.autoplay });
  },
  onPlay: function (e) {
    this.props.onPlay();
    this.setState({ play: true });
    e.preventDefault();
  },
  onPause: function (e) {
    this.props.onPause();
    this.setState({ play: false });
    e.preventDefault();
  },
  render: function () {
    if (this.state.play) {
      return (<a href="#" onClick={this.onPause}>Pause</a>);
    } else {
      return (<a href="#" onClick={this.onPlay}>Play</a>);
    }
  }
});

module.exports = PlayPause;

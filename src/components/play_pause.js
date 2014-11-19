/** @jsx React.DOM */

var React = require('react');

var PlayPause = React.createClass({
  propTypes: {
    autoplay: React.PropTypes.bool.isRequired,
    player: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return { play: false };
  },
  componentWillReceiveProps: function (props) {
    // Move autoplay prop to play state
    this.setState({ play: props.autoplay });
  },
  onPlay: function (e) {
    this.props.player.play();
    this.setState({ play: true });
    e.preventDefault();
  },
  onPause: function (e) {
    this.props.player.pause();
    this.setState({ play: false });
    e.preventDefault();
  },
  render: function () {
    if (this.state.play) {
      return (<a href="#" onClick={this.onPause} className="fa fa-pause"></a>);
    } else {
      return (<a href="#" onClick={this.onPlay} className="fa fa-play"></a>);
    }
  }
});

module.exports = PlayPause;

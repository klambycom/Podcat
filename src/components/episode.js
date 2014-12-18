/** @jsx React.DOM */

var React = require('react');
var PlaylistActions = require('../reflux/playlist_actions');

var Episode = React.createClass({
  getDefaultProps: function () {
    return {
      play: true,
      add: true
    };
  },
  getInitialState: function () {
    return { added: false };
  },
  propTypes: {
    title: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    audio_url: React.PropTypes.string.isRequired,
    play: React.PropTypes.bool,
    add: React.PropTypes.bool,
    queued: React.PropTypes.bool
  },
  handleClick: function (fnName) {
    return function (e) {
      // Trigger play or add action
      PlaylistActions[fnName]({
        title: this.props.title,
        image: this.props.image,
        audio_url: this.props.audio_url
      });

      // Change state of added
      if (fnName === 'add') { this.setState({ added: true }); }

      e.preventDefault();
    }.bind(this);
  },
  render: function () {
    var play = this.props.play && (<a href="#" onClick={this.handleClick('play')}>Play</a>);
    var add = this.props.add && (<a href="#" onClick={this.handleClick('add')}>Queue</a>);

    if (this.state.added || this.props.queued) { add = 'Queued'; }

    return (
        <div className="episode">
          <h3>
            {this.props.title}
            {' '}{play}
            {' '}{add}
          </h3>
        </div>
        );
  }
});

module.exports = Episode;

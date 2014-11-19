/** @jsx React.DOM */

var React = require('react');
var PlaylistActions = require('../playlist_actions');

var Episode = React.createClass({
  getDefaultProps: function () {
    return {
      play: true
    };
  },
  propTypes: {
    title: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    audio_url: React.PropTypes.string.isRequired,
    play: React.PropTypes.bool
  },
  onPlay: function (e) {
    PlaylistActions.play({
      title: this.props.title,
      image: this.props.image,
      audio_url: this.props.audio_url
    });

    e.preventDefault();
  },
  render: function () {
    var play = this.props.play && (<a href="#" onClick={this.onPlay}>Spela avsnittet</a>);

    return (
        <div className="episode">
          <h3>
            {this.props.title}
            {play}
          </h3>
        </div>
        );
  }
});

module.exports = Episode;

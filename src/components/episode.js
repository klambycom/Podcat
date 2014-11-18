/** @jsx React.DOM */

var React = require('react');
var PlaylistActions = require('../playlist_actions');

var Episode = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    audio_url: React.PropTypes.string.isRequired
  },
  onPlay: function (e) {
    PlaylistActions.play({
      title: this.props.title,
      image: this.props.image,
      audio_url: this.props.audio_url
    });

    console.log(this.props.title);
    console.log(this.props.audio_url);

    e.preventDefault();
  },
  render: function () {
    return (
        <div className="episode">
          <h3>
            {this.props.title}
            <a href="#" onClick={this.onPlay}>Spela avsnittet</a>
          </h3>
        </div>
        );
  }
});

module.exports = Episode;

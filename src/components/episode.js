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
  propTypes: {
    title: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    audio_url: React.PropTypes.string.isRequired,
    play: React.PropTypes.bool,
    add: React.PropTypes.bool
  },
  onClick: function (fnName) {
    return function (e) {
      PlaylistActions[fnName]({
        title: this.props.title,
        image: this.props.image,
        audio_url: this.props.audio_url
      });

      e.preventDefault();
    }.bind(this);
  },
  render: function () {
    var play = this.props.play && (<a href="#" onClick={this.onClick('play')}>Play</a>);
    var add = this.props.add && (<a href="#" onClick={this.onClick('add')}>Queue</a>);

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

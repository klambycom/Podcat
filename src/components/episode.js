/** @jsx React.DOM */

var React = require('react');
var PlaylistActions = require('../reflux/playlist_actions');
var moment = require('moment');

var Episode = React.createClass({
  getInitialState: function () {
    return { added: false };
  },
  getDefaultProps: function () {
    return { play: true, add: true };
  },
  propTypes: {
    data: React.PropTypes.object.isRequired,
    play: React.PropTypes.bool,
    add: React.PropTypes.bool
  },
  componentDidMount: function () {
    this.setState({ added: this.props.data.queued });
  },
  handleClick: function (fnName) {
    return function (e) {
      // Trigger play or add action
      PlaylistActions[fnName]({
        title: this.props.data.title,
        image: this.props.data.image,
        // this.props.data.audio_url is when episode already is in playlist
        audio_url: this.props.data.audio_url || this.props.data.file.url
      });

      // Change state of added
      this.setState({ added: true });

      e.preventDefault();
    }.bind(this);
  },
  render: function () {
    var play = this.props.play && (<a href="#" onClick={this.handleClick('play')}>Play</a>);
    var add = this.props.add && (<a href="#" onClick={this.handleClick('add')}>Queue</a>);
    if (this.state.added) { add = 'Queued'; }

    var date = '';
    if (typeof this.props.data.pubDate !== 'undefined') {
      date = moment(this.props.data.pubDate).fromNow();
    }

    return (
        <div className="episode">
          <div className="header">
            <div className="title">{this.props.data.title}</div>
            <div className="date">{date}</div>
          </div>
          <div className="summary">{this.props.data.summary}</div>
          <div className="footer">{play} {add}</div>
        </div>
        );
  }
});

module.exports = Episode;

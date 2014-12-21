/** @jsx React.DOM */

var React = require('react');
var PlaylistActions = require('../reflux/playlist_actions');
var moment = require('moment');

var Episode = React.createClass({
  getInitialState: function () {
    return { added: false };
  },
  getDefaultProps: function () {
    return { play: true, add: true, remove: false };
  },
  propTypes: {
    data: React.PropTypes.object.isRequired,
    play: React.PropTypes.bool,
    add: React.PropTypes.bool,
    remove: React.PropTypes.bool
  },
  componentDidMount: function () {
    this.setState({ added: this.props.data.queued });
  },
  handleAdd: function (fnName) {
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
  handleRemove: function (e) {
    PlaylistActions.remove(this.props.data);
    e.preventDefault();
  },
  render: function () {
    var remove = this.props.remove && (<a href="#" onClick={this.handleRemove}>Remove</a>);
    var play = this.props.play && (<a href="#" onClick={this.handleAdd('play')}>Play</a>);
    var add = this.props.add && (<a href="#" onClick={this.handleAdd('add')}>Queue</a>);
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
          <div className="footer">{play} {add} {remove}</div>
        </div>
        );
  }
});

module.exports = Episode;

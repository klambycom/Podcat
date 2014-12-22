/** @jsx React.DOM */

var React = require('react');
var PlaylistActions = require('../reflux/playlist_actions');
var moment = require('moment');

var decodeText = function (text) {
  if (text === '') { return text; }
  var el = document.createElement('div');
  el.innerHTML = text;
  return el.childNodes[0].nodeValue;
};

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
  getPubDate: function () {
    if (typeof this.props.data.pubDate !== 'undefined') {
      var pubDate = moment(this.props.data.pubDate);
      return pubDate.isBefore(moment().startOf('month')) ?
        pubDate.format('ll') : pubDate.fromNow();
    }
    return '';
  },
  render: function () {
    var remove = this.props.remove && (<a href="#" onClick={this.handleRemove}>Remove</a>);
    var play = this.props.play && (<a href="#" onClick={this.handleAdd('play')}>Play</a>);
    var add = this.props.add && (<a href="#" onClick={this.handleAdd('add')}>Queue</a>);
    if (this.state.added) { add = 'Queued'; }

    return (
        <div className="episode">
          <div className="header">
            <div className="title">{decodeText(this.props.data.title)}</div>
            <div className="date">{this.getPubDate()}</div>
          </div>
          <div className="summary">{decodeText(this.props.data.summary)}</div>
          <div className="footer">{play} {add} {remove}</div>
        </div>
        );
  }
});

module.exports = Episode;

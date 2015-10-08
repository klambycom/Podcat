/** @jsx React.DOM */

var React = require('react');
var Reflux = require('reflux');
var PlaylistActions = require('../reflux/playlist_actions');
var PlaylistStore = require('../reflux/playlist_store.js');
var moment = require('moment');
var Link = require('react-router').Link;

var decodeText = function (text) {
  if (text === '') { return text; }
  var el = document.createElement('div');
  el.innerHTML = text;
  return el.childNodes[0].nodeValue;
};

var Episode = React.createClass({
  mixins: [ Reflux.listenTo(PlaylistStore, 'onMove') ],
  getInitialState: function () {
    return { added: false };
  },
  getDefaultProps: function () {
    return { play: true, add: true, remove: false, draggable: false, compact: false };
  },
  propTypes: {
    data: React.PropTypes.object.isRequired,
    play: React.PropTypes.bool,
    add: React.PropTypes.bool,
    remove: React.PropTypes.bool,
    draggable: React.PropTypes.bool,
    compact: React.PropTypes.bool
  },
  componentDidMount: function () {
    this.setState({ added: this.props.data.queued });

    var div = this.refs.episode.getDOMNode();
    div.addEventListener('dragstart', this.handleDragStart);
    div.addEventListener('dragend', this.handleDragEnd);
    div.addEventListener('dragover', this.handleDragOver);
    div.addEventListener('dragleave', this.handleDragLeave);
  },
  handleDragStart: function () {
    this.refs.episode.getDOMNode().classList.add('drag');
  },
  handleDragOver: function (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    PlaylistActions.dragOver(this.props.data); // to
    this.refs.episode.getDOMNode().classList.add('over');
  },
  handleDragLeave: function () {
    this.refs.episode.getDOMNode().classList.remove('over');
  },
  handleDragEnd: function () {
    PlaylistActions.dragEnd(this.props.data); // from
    this.refs.episode.getDOMNode().classList.remove('drag');
    this.refs.episode.getDOMNode().classList.remove('over');
  },
  onMove: function (_, type) {
    if (type === 'move') { this.refs.episode.getDOMNode().classList.remove('over'); }
  },
  handleAdd: function (fnName) {
    return function (e) {
      // Trigger play or add action
      PlaylistActions[fnName]({
        title: this.props.data.title,
        image: this.props.data.image,
        colors: this.props.data.colors,
        podcast: this.props.data.podcast,
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
    var remove = this.props.remove &&
      (<a href="#" className="remove" onClick={this.handleRemove}>Remove</a>);
    var play = this.props.play && (<a href="#" onClick={this.handleAdd('play')}>Play</a>);
    var add = this.props.add && (<a href="#" onClick={this.handleAdd('add')}>Queue</a>);
    if (this.props.add && this.state.added) { add = 'Queued'; }

    var classes = 'episode', image = '', createdBy = '';
    if (this.props.compact) {
      classes += ' compact';

      var c = this.props.data.colors[0];
      var imageStyle = { backgroundColor: 'rgb(' + c.r + ', ' + c.g + ', ' + c.b + ')' };
      image = (
          <a
            href="#"
            className="image fa fa-play"
            style={imageStyle}
            onClick={this.handleAdd('play')}></a>
          );
      if (!this.props.play) {
        image = <div style={imageStyle} className="image fa fa-volume-up"></div>;
      }

      play = '';
      createdBy = (
          <Link to={'/podcast/' + this.props.data.podcast.id}>
            {this.props.data.podcast.title}
          </Link>
          );
    }

    return (
        <div draggable={this.props.draggable} ref="episode" className={classes}> 
          {image}
          <div>
            <div className="header">
              <div className="title">{decodeText(this.props.data.title)}</div>
              <div className="date">{this.getPubDate()}</div>
            </div>
            <div className="summary">{decodeText(this.props.data.summary)}</div>
            <div className="footer">{createdBy} {play} {add} {remove}</div>
          </div>
        </div>
        );
  }
});

module.exports = Episode;

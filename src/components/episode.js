import React from 'react';
import Reflux from 'reflux';
import * as Playlist from '../reflux/playlist';
import moment from 'moment';
import { Link } from 'react-router';

let decodeText = function (text) {
  if (text === '') { return text; }
  let el = document.createElement('div');
  el.innerHTML = text;
  return el.childNodes[0].nodeValue;
};

export default React.createClass({
  name: 'Episode',

  mixins: [ Reflux.listenTo(Playlist.store, 'onMove') ],

  getInitialState() {
    return { added: false };
  },

  getDefaultProps() {
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

  componentDidMount() {
    this.setState({ added: this.props.data.queued });

    let div = this.refs.episode.getDOMNode();
    div.addEventListener('dragstart', this.handleDragStart);
    div.addEventListener('dragend', this.handleDragEnd);
    div.addEventListener('dragover', this.handleDragOver);
    div.addEventListener('dragleave', this.handleDragLeave);
  },

  handleDragStart() {
    this.refs.episode.getDOMNode().classList.add('drag');
  },

  handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    Playlist.actions.dragOver(this.props.data); // to
    this.refs.episode.getDOMNode().classList.add('over');
  },

  handleDragLeave() {
    this.refs.episode.getDOMNode().classList.remove('over');
  },

  handleDragEnd() {
    Playlist.actions.dragEnd(this.props.data); // from
    this.refs.episode.getDOMNode().classList.remove('drag');
    this.refs.episode.getDOMNode().classList.remove('over');
  },

  onMove(_, type) {
    if (type === 'move') { this.refs.episode.getDOMNode().classList.remove('over'); }
  },

  handleAdd(fnName) {
    return function (e) {
      // Trigger play or add action
      Playlist.actions[fnName]({
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

  handleRemove(e) {
    Playlist.actions.remove(this.props.data);
    e.preventDefault();
  },

  getPubDate() {
    if (typeof this.props.data.pubDate !== 'undefined') {
      let pubDate = moment(this.props.data.pubDate);
      return pubDate.isBefore(moment().startOf('month')) ?
        pubDate.format('ll') : pubDate.fromNow();
    }
    return '';
  },

  render() {
    let remove = this.props.remove &&
      (<a href="#" className="remove" onClick={this.handleRemove}>Remove</a>);
    let play = this.props.play && (<a href="#" onClick={this.handleAdd('play')}>Play</a>);
    let add = this.props.add && (<a href="#" onClick={this.handleAdd('add')}>Queue</a>);
    if (this.props.add && this.state.added) { add = 'Queued'; }

    let classes = 'episode', image = '', createdBy = '';
    if (this.props.compact) {
      classes += ' compact';

      let c = this.props.data.colors[0];
      let imageStyle = { backgroundColor: `rgb(${c.r}, ${c.g}, ${c.b})` };
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
          <Link to={`/podcast/${this.props.data.podcast.id}`}>
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

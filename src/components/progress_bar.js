import React from 'react';
import Reflux from 'reflux';
import * as ProgressBar from '../reflux/progress_bar.js';

let secsToStr = function (time) {
  if (isNaN(time)) { return '00:00'; }
  let hour = '';
  let min = Math.round(time / 60);
  let sec = Math.round(time % 60);

  if (min > 59) {
    hour = Math.round(min / 60) + ':';
    min = Math.round(min % 60);
  }

  return hour + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
};

export default React.createClass({
  name: 'ProgressBar',

  mixins: [Reflux.listenTo(ProgressBar.store, 'onProgress')],

  getInitialState() {
    return {
      // Time in seconds
      currentTime: 0,
      duration: 0,
      // Percent of progress bar
      bufferedPercent: 0,
      timePercent: 0,
      // Seconds under cursor
      underCursor: 0,
      // Is data loading?
      loading: false
    };
  },

  onProgress(progress) {
    this.setState(progress);
  },

  eventOffset: function (fn) {
    return function (e) {
      fn(e.nativeEvent.offsetX, this.refs.progress_bar.getDOMNode().offsetWidth);
    }.bind(this);
  },

  handleClick: ProgressBar.actions.updateTime,

  handleMouseMove: ProgressBar.actions.moveMouse,

  renderLoading() {
    if (this.state.loading) { return <div className="loading"></div>; }
  },

  render() {
    let bufferedStyles = { width: `${this.state.bufferedPercent}%` };
    let timeStyles = { width: `${this.state.timePercent}%` };

    return (
        <div
          className="progress-bar"
          ref="progress_bar"
          onClick={this.eventOffset(this.handleClick)}
          onMouseMove={this.eventOffset(this.handleMouseMove)}>

          <span className="start-time">{secsToStr(this.state.underCursor)}</span>
          <span className="end-time">{secsToStr(this.state.duration)}</span>

          <div className="buffered" style={bufferedStyles}></div>
          <div className="time" style={timeStyles}></div>
          {this.renderLoading()}
        </div>
        );
  }
});

/** @jsx React.DOM */

var React = require('react');
var Reflux = require('reflux');
var ProgressBarStore = require('../reflux/progress_bar_store.js');
var ProgressBarActions = require('../reflux/progress_bar_actions.js');

var ProgressBar = React.createClass({
  mixins: [Reflux.listenTo(ProgressBarStore, 'onProgress')],
  getInitialState: function () {
    return {
      currentTime: 0,
      duration: 0,
      bufferedPercent: 0,
      timePercent: 0,
      underCursor: 0
    };
  },
  onProgress: function (progress) {
    this.setState(progress);
  },
  eventToSecs: function (fn) {
    return function (e) {
      fn(e.nativeEvent.offsetX, this.refs.progress_bar.getDOMNode().offsetWidth);
    }.bind(this);
  },
  handleClick: ProgressBarActions.updateTime,
  handleMouseMove: ProgressBarActions.moveMouse,
  secsToStr: function (time) {
    if (isNaN(time)) { return '00:00'; }
    var sec = Math.round(time % 60);
    var min = Math.round(time / 60);
    return (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
  },
  render: function () {
    var bufferedStyles = { width: this.state.bufferedPercent + '%' };
    var timeStyles = { width: this.state.timePercent + '%' };

    return (
        <div
          className="progress-bar"
          ref="progress_bar"
          onClick={this.eventToSecs(this.handleClick)}
          onMouseMove={this.eventToSecs(this.handleMouseMove)}>

          <span className="start-time">{this.secsToStr(this.state.underCursor)}</span>
          <span className="end-time">{this.secsToStr(this.state.duration)}</span>

          <div className="buffered" style={bufferedStyles}></div>
          <div className="time" style={timeStyles}></div>
        </div>
        );
  }
});

module.exports = ProgressBar;

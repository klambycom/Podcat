/** @jsx React.DOM */

var React = require('react');
var AudioPlayer = require('../audio_player.js');

var ProgressBar = React.createClass({
  getInitialState: function () {
    return {
      currentTime: 0,
      duration: 0,
      bufferedPercent: 0,
      timePercent: 0,
      timeUnderCursor: 0
    };
  },
  componentDidMount: function () {
    // Update progress bar using progress and timeupdate event
    AudioPlayer.addEventListener('progress', this.updateProgress);
    AudioPlayer.addEventListener('timeupdate', this.updateProgress);
  },
  updateProgress: function () {
    // Get buffered percent
    var buffered = 0;
    if (AudioPlayer.buffered.length > 0) {
      buffered = AudioPlayer.buffered.end(AudioPlayer.buffered.length - 1) / AudioPlayer.duration * 100;
    }
    // Get played percent
    var time = 0;
    if (!isNaN(AudioPlayer.duration)) {
      time = AudioPlayer.currentTime / AudioPlayer.duration * 100;
    }
    // Update state, and round to one decimal
    this.setState({
      currentTime: AudioPlayer.currentTime,
      duration: AudioPlayer.duration,
      bufferedPercent: +buffered.toFixed(1),
      timePercent: +time.toFixed(1)
    });
  },
  eventToSecs: function (fn) {
    return function (e) {
      var offset = e.nativeEvent.offsetX;
      var width = this.refs.progress_bar.getDOMNode().offsetWidth;
      fn(AudioPlayer.duration * (offset / width));
    }.bind(this);
  },
  handleClick: function (time) {
    AudioPlayer.currentTime = time;
  },
  handleMouseMove: function (time) {
    this.setState({ timeUnderCursor: time });
  },
  secondsToString: function (time) {
    if (isNaN(time)) { return '00:00'; }
    return Math.round(time / 60) + ':' + Math.round(time % 60);
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

          <span className="start-time">{this.secondsToString(this.state.timeUnderCursor)}</span>
          <span className="end-time">{this.secondsToString(this.state.duration)}</span>

          <div className="buffered" style={bufferedStyles}></div>
          <div className="time" style={timeStyles}></div>
        </div>
        );
  }
});

module.exports = ProgressBar;

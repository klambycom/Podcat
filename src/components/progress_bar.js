/** @jsx React.DOM */

var React = require('react');
var AudioPlayer = require('../audio_player.js');

var ProgressBar = React.createClass({
  getInitialState: function () {
    return {
      bufferedPercent: 0,
      timePercent: 0
    };
  },
  componentDidMount: function () {
    // Update progress bar using progress and timeupdate event
    AudioPlayer.addEventListener('progress', this.updateProgress);
    AudioPlayer.addEventListener('timeupdate', this.updateProgress);
  },
  updateProgress: function (e) {
    // Get buffered percent
    var buffered = 0;
    if (AudioPlayer.buffered.length > 0) {
      buffered = AudioPlayer.buffered.end(0) / AudioPlayer.duration * 100;
    }
    // Get played percent
    var time = 0;
    if (!isNaN(AudioPlayer.duration)) {
      time = AudioPlayer.currentTime / AudioPlayer.duration * 100;
    }
    // Update state, and round to one decimal
    this.setState({
      bufferedPercent: +buffered.toFixed(1),
      timePercent: +time.toFixed(1)
    });
  },
  render: function () {
    return (
        <div className="progress-bar">
          <div className="buffered">Buffered: {this.state.bufferedPercent}%</div>
          <div className="time">Time: {this.state.timePercent}%</div>
        </div>
        );
  }
});

module.exports = ProgressBar;

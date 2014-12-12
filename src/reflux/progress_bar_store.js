var Reflux = require('reflux');
var actions = require('./progress_bar_actions.js');
var AudioPlayer = require('../audio_player.js');

var store = Reflux.createStore({
  listenables: actions,
  init: function () {
    AudioPlayer.addEventListener('progress', this.onProgress.bind(this));
    AudioPlayer.addEventListener('timeupdate', this.onProgress.bind(this));
  },
  onProgress: function () {
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

    this.trigger({
      currentTime: AudioPlayer.currentTime,
      duration: AudioPlayer.duration,
      bufferedPercent: +buffered.toFixed(1),
      timePercent: +time.toFixed(1)
    });
  },
  onUpdateTime: function (offset, width) {
    AudioPlayer.currentTime = AudioPlayer.duration * (offset / width);
  },
  onMoveMouse: function (offset, width) {
    this.trigger({ underCursor: AudioPlayer.duration * (offset / width) });
  }
});

module.exports = store;

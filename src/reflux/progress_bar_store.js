var Reflux = require('reflux');
var actions = require('./progress_bar_actions.js');
var AudioPlayer = require('../audio_player.js');
var storage = require('../playlist_storage.js');

var store = Reflux.createStore({
  listenables: actions,
  init: function () {
    // Events for progress bar
    AudioPlayer.addEventListener('progress', this.triggerProgress.bind(this));
    AudioPlayer.addEventListener('timeupdate', this.triggerProgress.bind(this));
    // Start/stop loading events
    AudioPlayer.addEventListener('loadstart', this.triggerLoading.bind(this, true));
    AudioPlayer.addEventListener('canplay', this.triggerLoading.bind(this, false));
  },
  onUpdateTime: function (offset, width) {
    AudioPlayer.currentTime = AudioPlayer.duration * (offset / width);
  },
  onMoveMouse: function (offset, width) {
    this.trigger({ underCursor: AudioPlayer.duration * (offset / width) });
  },
  triggerProgress: function () {
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

    // Get next episode
    var nearEnd = AudioPlayer.duration - AudioPlayer.currentTime < 30;
    var nextEpisode = nearEnd ? storage.peek() : {};

    this.trigger({
      currentTime: AudioPlayer.currentTime,
      duration: AudioPlayer.duration,
      bufferedPercent: +buffered.toFixed(1),
      timePercent: +time.toFixed(1),
      nearEnd: nearEnd,
      nextEpisode: nextEpisode
    });
  },
  triggerLoading: function (loading) {
    this.trigger({ loading: loading });
  }
});

module.exports = store;

var Reflux = require('reflux');
var actions = require('./player_actions.js');
var AudioPlayer = require('../audio_player.js');

var store = Reflux.createStore({
  listenables: actions,
  onPlay: function (url, autoplay) {
    // Change src if current url is not already playing
    if (AudioPlayer.src !== url) {
      AudioPlayer.src = url;
    }

    // And play unless autoplay is false
    if (typeof autoplay === 'undefined' || autoplay === true) {
      AudioPlayer.play();
    }

    this.trigger(!AudioPlayer.paused);
  },
  onPause: function () {
    AudioPlayer.pause();
    this.trigger(false);
  },
  onToggle: function() {
    if (AudioPlayer.paused) {
      AudioPlayer.play();
    } else {
      AudioPlayer.pause();
    }

    this.trigger(!AudioPlayer.paused);
  }
});

module.exports = store;

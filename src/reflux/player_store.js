var Reflux = require('reflux');
var actions = require('./player_actions.js');
var audioPlayer = require('../audio_player.js');

var store = Reflux.createStore({
  listenables: actions,
  onPlay: function (url, autoplay) {
    // Change src if current url is not already playing
    if (audioPlayer.src !== url) {
      audioPlayer.src = url;
    }

    // And play unless autoplay is false
    if (typeof autoplay === 'undefined' || autoplay === true) {
      audioPlayer.play();
    }

    this.trigger(!audioPlayer.paused);
  },
  onPause: function () {
    audioPlayer.pause();
    this.trigger(false);
  },
  onToggle: function() {
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }

    this.trigger(!audioPlayer.paused);
  }
});

module.exports = store;

var Reflux = require('reflux');
var actions = require('./player_actions.js');
var AudioPlayer = require('../audio_player.js');
var storage = require('../playlist_storage.js');

var saveCurrentTime = function () {
  var playlist = storage.all();
  playlist[0].currentTime = AudioPlayer.currentTime;
  storage.save(playlist);
};

var changeCurrentTime = function () {
  var playlist = storage.all();
  if (typeof playlist[0].currentTime !== 'undefined') {
    AudioPlayer.currentTime = playlist[0].currentTime;
    delete playlist[0].currentTime;
    storage.save(playlist);
  }
};

var store = Reflux.createStore({
  listenables: actions,
  init: function () {
    window.addEventListener('beforeunload', saveCurrentTime);
    AudioPlayer.addEventListener('canplay', changeCurrentTime);
  },
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
  },
  onReload: function () {
    var url = AudioPlayer.src;
    AudioPlayer.src = '';
    this.onPlay(url, true);
  }
});

module.exports = store;

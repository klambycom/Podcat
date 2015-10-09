import Reflux from 'reflux';
import AudioPlayer from '../audio_player.js';
import storage from '../playlist_storage.js';

let saveCurrentTime = function () {
  let playlist = storage.all();
  playlist[0].currentTime = AudioPlayer.currentTime;
  storage.save(playlist);
};

let changeCurrentTime = function () {
  let playlist = storage.all();
  if (typeof playlist[0].currentTime !== 'undefined') {
    AudioPlayer.currentTime = playlist[0].currentTime;
    delete playlist[0].currentTime;
    storage.save(playlist);
  }
};

export let actions = Reflux.createActions([ 'play', 'pause', 'toggle', 'reload' ]);

export let store = Reflux.createStore({
  listenables: actions,

  init() {
    window.addEventListener('beforeunload', saveCurrentTime);
    AudioPlayer.addEventListener('canplay', changeCurrentTime);
  },

  onPlay(url, autoplay) {
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

  onPause() {
    AudioPlayer.pause();
    this.trigger(false);
  },

  onToggle() {
    if (AudioPlayer.paused) {
      AudioPlayer.play();
    } else {
      AudioPlayer.pause();
    }

    this.trigger(!AudioPlayer.paused);
  },

  onReload() {
    let url = AudioPlayer.src;
    AudioPlayer.src = '';
    this.onPlay(url, true);
  }
});

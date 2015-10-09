import Reflux from 'reflux';
import AudioPlayer from '../audio_player.js';
import storage from '../playlist_storage.js';

export let actions = Reflux.createActions([
  'updateTime',
  'moveMouse'
]);

export let store = Reflux.createStore({
  listenables: actions,

  init() {
    // Events for progress bar
    AudioPlayer.addEventListener('progress', this.triggerProgress.bind(this));
    AudioPlayer.addEventListener('timeupdate', this.triggerProgress.bind(this));
    // Start/stop loading events
    AudioPlayer.addEventListener('loadstart', this.triggerLoading.bind(this, true));
    AudioPlayer.addEventListener('canplay', this.triggerLoading.bind(this, false));
  },

  onUpdateTime(offset, width) {
    AudioPlayer.currentTime = AudioPlayer.duration * (offset / width);
  },

  onMoveMouse(offset, width) {
    this.trigger({ underCursor: AudioPlayer.duration * (offset / width) });
  },

  triggerProgress() {
    // Get buffered percent
    let buffered = 0;
    if (AudioPlayer.buffered.length > 0) {
      buffered = AudioPlayer.buffered.end(AudioPlayer.buffered.length - 1) / AudioPlayer.duration * 100;
    }

    // Get played percent
    let time = 0;
    if (!isNaN(AudioPlayer.duration)) {
      time = AudioPlayer.currentTime / AudioPlayer.duration * 100;
    }

    // Get next episode
    let nearEnd = AudioPlayer.duration - AudioPlayer.currentTime < 30;
    let nextEpisode = nearEnd ? storage.peek() : {};

    this.trigger({
      currentTime: AudioPlayer.currentTime,
      duration: AudioPlayer.duration,
      bufferedPercent: +buffered.toFixed(1),
      timePercent: +time.toFixed(1),
      nearEnd: nearEnd,
      nextEpisode: nextEpisode
    });
  },

  triggerLoading(loading) {
    this.trigger({ loading: loading });
  }
});

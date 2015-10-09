import Reflux from 'reflux';
import AudioPlayer from '../audio_player.js';

export let actions = Reflux.createActions([ 'success', 'info', 'warning', 'danger', 'close' ]);

export let store = Reflux.createStore({
  listenables: actions,

  init() {
    // Error that occurred during the loading of an audio
    AudioPlayer.addEventListener(
        'error',
        this.onWarning.bind(
          this, 'Error!', 'Something went wrong when loading audio.', 'player.src'));
    // Error that occurred when data is not available
    AudioPlayer.addEventListener(
        'stalled',
        this.onWarning.bind(
          this, 'Error!', 'Media data is not available.', 'player.src'));
  },

  onSuccess(title, message, source) {
    this.trigger({ type: 'success', title, message, source });
  },

  onInfo(title, message, source) {
    this.trigger({ type: 'info', title, message, source });
  },

  onWarning(title, message, source) {
    this.trigger({ type: 'warning', title, message, source });
  },

  onDanger(title, message, source) {
    this.trigger({ type: 'danger', title, message, source });
  },

  onClose() {
    this.trigger({ type: 'hide', title: '', message: '', source: '' });
  }
});

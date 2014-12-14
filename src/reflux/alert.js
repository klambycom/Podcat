var Reflux = require('reflux');
var AudioPlayer = require('../audio_player.js');

var actions = Reflux.createActions([ 'success', 'info', 'warning', 'danger', 'close' ]);

var store = Reflux.createStore({
  listenables: actions,
  init: function () {
    // Error that occurred during the loading of an audio
    AudioPlayer.addEventListener(
        'error',
        this.onWarning.bind(this, 'Error!', 'Something went wrong when loading audio.'));
    // Error that occurred when data is not available
    AudioPlayer.addEventListener(
        'stalled',
        this.onWarning.bind(this, 'Error!', 'Media data is not available.'));
  },
  onSuccess: function (title, message) {
    this.trigger({ type: 'success', title: title, message: message });
  },
  onInfo: function (title, message) {
    this.trigger({ type: 'info', title: title, message: message });
  },
  onWarning: function (title, message) {
    this.trigger({ type: 'warning', title: title, message: message });
  },
  onDanger: function (title, message) {
    this.trigger({ type: 'danger', title: title, message: message });
  },
  onClose: function () {
    this.trigger({ type: 'hide', title: '', message: '' });
  }
});

module.exports = {
  actions: actions,
  store: store
};

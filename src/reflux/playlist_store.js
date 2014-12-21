var Reflux = require('reflux');
var actions = require('./playlist_actions.js');
var storage = require('../playlist_storage.js');
var AudioPlayer = require('../audio_player.js');

var store = Reflux.createStore({
  listenables: actions,
  init: function () {
    AudioPlayer.addEventListener('ended', this.ended.bind(this));
  },
  onPlay: function (episode) {
    var index = storage.indexOf(episode);

    if (index > -1) {
      // If episode is later in queue, move forward to first
      if (index > 0) {
        storage.moveFirst(index);
      }
    } else {
      // If episode is not in queue, add first in queue
      storage.addFirst(episode);
    }

    this.trigger(storage.all());
  },
  onPause: function (time) {
    // Save new start time
    storage.update({ start_time: time });
    this.trigger(storage.all());
  },
  onNext: function () {
    if (!storage.empty()) {
      // Remove first episode in queue
      var removed = storage.removeFirst();

      // Add removed episode to history
      storage.history.add(removed);

      this.trigger(storage.all());
    }
  },
  onPrevious: function () {
    // Remove from history and add first in queue
    var previous = storage.history.remove();
    actions.play(previous);
  },
  onAdd: function (episode) {
    // Add last in queue
    storage.add(episode);
    this.trigger(storage.all(), 'add');
  },
  onRemove: function (episode) {
    storage.remove(episode);
    this.trigger(storage.all(), 'remove');
  },
  ended: function () {
    if (storage.empty()) {
      // Remove playlist if last episode in playlist just ended
      storage.clear();
      this.trigger([]);
    } else {
      // Else play next episode in playlist
      this.onNext();
    }
  }
});

module.exports = store;

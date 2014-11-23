var Reflux = require('reflux');
var actions = require('./playlist_actions.js');
var storage = require('../playlist_storage.js');

var store = Reflux.createStore({
  listenables: actions,
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
    this.trigger();
  },
  onNext: function () {
    // Remove first episode in queue
    var removed = storage.remove();

    // Add removed episode to history
    storage.history.add(removed);

    this.trigger(storage.all());
  },
  onPrevious: function () {
    // Remove from history and add first in queue
    var previous = storage.history.remove();
    actions.play(previous);
  },
  onAdd: function (episode) {
    // Add last in queue
    storage.add(episode);
    this.trigger(storage.all());
  },
  onRemove: function (/*episode*/) {
    // Remove episode from queue
    // TODO Maybe allow fn as argument
    //this.queue.filter(function (x) {
      //return x.audio_url !== episode.audio_url;
    //});
    //storage.update(this.queue);
    //this.trigger(this.queue);
  }
});

module.exports = store;

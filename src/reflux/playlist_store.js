var Reflux = require('reflux');
var actions = require('./playlist_actions.js');
var storage = require('../playlist_storage.js');

var store = Reflux.createStore({
  init: function () {
    this.listenToMany(actions);

    // Queue is saved in localStorage
    storage.all(this.initQueue.bind(this));
  },
  initQueue: function (playlist) {
    this.queue = playlist;
  },
  onPlay: function (episode) {
    var index = this.queue.reduce(function (acc, x, i) {
      return x.audio_url === episode.audio_url ? i : acc;
    }, -1);

    if (index > -1) {
      // If episode is later in queue, move forward to first
      if (index > 0) {
        this.queue.splice(index, 1);
        this.queue.unshift(episode);
      }
      // TODO Save start time
    } else {
      // If episode is not in queue, add first in queue
      this.queue.unshift(episode);
    }

    this.trigger(this.queue);

    // Save new playlist
    storage.update(this.queue);
  },
  onPause: function (time) {
    // Save new start time
    this.queue[0].start_time = time;
    storage.update(this.queue);
    this.trigger();
  },
  onNext: function () {
    // Remove first episode in queue
    this.queue.shift();
    storage.update(this.queue);
    this.trigger(this.queue);
  },
  onPrevious: function () {
    // TODO
  },
  onAdd: function (episode) {
    // Add last in queue
    this.queue.push(episode);
    storage.update(this.queue);
    this.trigger(this.queue);
  },
  onRemove: function (episode) {
    // Remove episode from queue
    // TODO Maybe allow fn as argument
    this.queue.filter(function (x) {
      return x.audio_url !== episode.audio_url;
    });
    storage.update(this.queue);
    this.trigger(this.queue);
  }
});

module.exports = store;

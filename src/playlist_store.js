var Reflux = require('reflux');
var localforage = require('localforage');
var actions = require('./playlist_actions.js');

var store = Reflux.createStore({
  QUEUE_ID: 'playlist.queue',
  HISTORY_ID: 'playlist.history',
  init: function () {
    this.listenToMany(actions);

    localforage
      .getItem(this.QUEUE_ID)
      .then(this.initQueue);

    localforage
      .getItem(this.HISTORY_ID)
      .then(this.initHistory);
  },
  fromStorage: function (type) {
    var self = this[type];

    return function (error, playlist) {
      if (error) {
        self = [];
      } else {
        self = playlist;
      }
    };
  },
  initQueue: function (error, playlist) {
    if (error) {
      this.queue = [];
    } else {
      this.queue = playlist;
    }
  },
  initHistory: function (error, playlist) {
    if (error) {
      this.history = [];
    } else {
      this.history = playlist;
    }
  },
  indexOf: function (array, episode) {
    return array.reduce(function (acc, x, i) {
      return x.url === episode.url ? i : acc;
    }, -1);
  },
  onPlay: function (episode) {
    var index = this.indexOf(this.queue, episode);
      
    if (index > -1) {
      // If episode is later in queue, move forward to first
      if (index > 0) {
        this.queue.splice(index, 1);
        this.queue.unshift(episode);
      }
      // TODO Start from saved start time
    } else {
      // If episode is not in queue, add first in queue
      this.queue.unshift(episode);
    }

    this.trigger(this.queue[0], this.queue);

    // Save new playlist
    localforage.setItem(this.QUEUE_ID, this.queue);
  },
  onPause: function (/*episode*/) {
    // TODO Save new start time
    this.trigger();
  },
  // Arg is current episode with time
  onNext: function (/*currentEpisode*/) {
    // If saved start time (if not finished last time), dont run from begining.
  },
  // Arg is current episode with time
  onPrevious: function (/*currentEpisode*/) {
    // If played more than a couple of seconds, start episode over.
  },
  onAdd: function (/*episode*/) {
    // Add last in queue
  },
  onRemove: function (/*episode*/) {
    // Remove episode from queue
    // Maybe allow fn as argument
    this.trigger(this.queue);
  },
  onClear: function () {
    // Maybe remove?
  }
});

module.exports = store;

var Reflux = require('reflux');
var localforage = require('localforage');
var actions = require('./playlist_actions.js');

var store = Reflux.createStore({
  QUEUE_ID: 'playlist.queue',
  HISTORY_ID: 'playlist.history',
  init: function () {
    this.listenToMany(actions);

    // Queue is saved in localStorage
    localforage
      .getItem(this.QUEUE_ID)
      .then(this.initQueue.bind(this));

    // TODO History should be saved in sessionStorage, and should not be
    // initialized
    //localforage
      //.getItem(this.HISTORY_ID)
      //.then(this.initHistory.bind(this));
  },
  initQueue: function (playlist, error) {
    if (error || !(typeof playlist !== 'undefined' && playlist.length > 0)) {
      this.queue = [];
    } else {
      this.queue = playlist;
    }
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
  onNext: function () {
    // Remove first episode in queue
    this.queue.shift();
    localforage.setItem(this.QUEUE_ID, this.queue);
    this.trigger(this.queue[0], this.queue);
  },
  onPrevious: function () {
    // TODO
  },
  onAdd: function (episode) {
    // Add last in queue
    this.queue.push(episode);
    localforage.setItem(this.QUEUE_ID, this.queue);
    this.trigger(this.queue[0], this.queue);
  },
  onRemove: function (episode) {
    // Remove episode from queue
    // TODO Maybe allow fn as argument
    this.queue.filter(function (x) {
      return x.audio_url !== episode.audio_url;
    });
    localforage.setItem(this.QUEUE_ID, this.queue);
    this.trigger(this.queue[0], this.queue);
  },
  onClear: function () {
    // Maybe remove?
  }
});

module.exports = store;

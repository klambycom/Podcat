var localforage = require('localforage');

var storage = {
  QUEUE_ID: 'playlist.queue',
  all: function (callback) {
    localforage
      .getItem(this.QUEUE_ID)
      .then(function (result, error) {
        if (error || !(typeof result !== 'undefined' && result !== null && result.length > 0)) {
          callback([]);
        } else {
          callback(result);
        }
      });
  },
  update: function (queue) {
    localforage.setItem(this.QUEUE_ID, queue);
  },
  history: {
    HISTORY_ID: 'playlist.history',
    all: function () {
      return JSON.parse(sessionStorage.getItem(this.HISTORY_ID)) || [];
    },
    add: function (item) {
      if (item == null) return;

      // Add first
      var queue = this.all();
      queue.unshift(item);
      sessionStorage.setItem(this.HISTORY_ID, JSON.stringify(queue));
    },
    remove: function () {
      // Remove first
      var queue = this.all();
      var item = queue.shift();
      sessionStorage.setItem(this.HISTORY_ID, JSON.stringify(queue));
      return item;
    }
  }
};

module.exports = storage;

var localforage = require('localforage');

var playlistStorage = {
  QUEUE_ID: 'playlist.queue',
  HISTORY_ID: 'playlist.history',
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
  history: function () {
    // TODO sessionStorage?
  },
  update: function (queue) {
    localforage.setItem(this.QUEUE_ID, queue);
  }
};

module.exports = playlistStorage;

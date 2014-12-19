var Firebase = require('firebase');
var Reflux = require('reflux');
var actions = require('./podcast_actions.js');
var storage = require('../playlist_storage.js');

var store = Reflux.createStore({
  listenables: actions,
  onInit: function (id) {
    var subscriptions = JSON.parse(localStorage.getItem('podcat.subscriptions')) || {};

    if (typeof id === 'undefined') {
      this.trigger({ subscriptions: subscriptions });
    } else {
      var podcastFromSubscriptions = subscriptions[id];

      // Get podcast data from firebase
      var database = new Firebase('https://blinding-torch-6567.firebaseio.com/podcasts/' + id);
      database.once('value', function (data) {
        var podcast = data.val();

        // Find queued episodes
        podcast.items.forEach(function (item) {
          item.queued = storage.indexOf({ audio_url: item.file.url }) >= 0;
        });

        this.trigger({
          subscriptions: subscriptions,
          subscribed: typeof podcastFromSubscriptions !== 'undefined',
          podcast: podcast
        });
      }, this);
    }
  },
  onSubscribe: function (key, podcast) {
    var subscriptions = JSON.parse(localStorage.getItem('podcat.subscriptions')) || {};

    subscriptions[key] = {
      id: key,
      title: podcast.title,
      image: podcast.image,
      url: podcast.url
    };

    localStorage.setItem('podcat.subscriptions', JSON.stringify(subscriptions));

    this.trigger({
      subscriptions: subscriptions,
      subscription: subscriptions[podcast.title],
      subscribed: true
    });
  },
  onUnsubscribe: function (key) {
    var subscriptions = JSON.parse(localStorage.getItem('podcat.subscriptions')) || [];

    // Remove subscription from localStorage
    var tmp = subscriptions[key];
    delete subscriptions[key];

    localStorage.setItem('podcat.subscriptions', JSON.stringify(subscriptions));

    this.trigger({
      subscriptions: subscriptions,
      subscription: tmp,
      subscribed: false
    });
  }
});

module.exports = store;

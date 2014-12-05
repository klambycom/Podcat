var Firebase = require('firebase');
var Reflux = require('reflux');
var actions = require('./podcast_actions.js');

var store = Reflux.createStore({
  init: function () {
    this.listenToMany(actions);
  },
  onInit: function (id) {
    var subscriptions = JSON.parse(localStorage.getItem('podcat.subscriptions')) || {};

    if (typeof id === 'undefined') {
      this.trigger({ subscriptions: subscriptions });
    } else {
      var podcastFromSubscriptions = subscriptions[id];

      // Get podcast data from firebase
      var database = new Firebase('https://blinding-torch-6567.firebaseio.com/podcasts/' + id);
      database.once('value', function (data) {
        this.trigger({
          subscriptions: subscriptions,
          subscribed: typeof podcastFromSubscriptions !== 'undefined',
          podcast: data.val()
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

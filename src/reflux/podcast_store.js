var Reflux = require('reflux');
var actions = require('./podcast_actions.js');

var store = Reflux.createStore({
  init: function () {
    this.listenToMany(actions);
  },
  onInit: function (id) {
    var subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || {};

    if (typeof id === 'undefined') {
      this.trigger({ subscriptions: subscriptions });
    } else {
      var podcastFromSubscriptions = subscriptions[id];

      this.trigger({
        subscriptions: subscriptions,
        subscribed: typeof podcastFromSubscriptions !== 'undefined',
        podcast: JSON.parse(sessionStorage.getItem(id))
      });
    }
  },
  onSubscribe: function (podcast) {
    var subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || {};

    // TODO Change podcast.title to id from firebase
    subscriptions[podcast.title] = {
      id: podcast.title,
      title: podcast.title,
      image: podcast.image
    };

    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));

    this.trigger({
      subscriptions: subscriptions,
      subscription: subscriptions[podcast.title],
      subscribed: true
    });
  },
  onUnsubscribe: function (podcast) {
    var subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];

    // TODO Change podcast.title to id from firebase
    var tmp = subscriptions[podcast.title];
    delete subscriptions[podcast.title];

    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));

    this.trigger({
      subscriptions: subscriptions,
      subscription: tmp,
      subscribed: false
    });
  }
});

module.exports = store;

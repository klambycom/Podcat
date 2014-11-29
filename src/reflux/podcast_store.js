var Reflux = require('reflux');
var actions = require('./podcast_actions.js');

var store = Reflux.createStore({
  init: function () {
    this.listenToMany(actions);
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

    this.trigger(true, subscriptions[podcast.title], subscriptions);
  },
  onUnsubscribe: function (podcast) {
    var subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];

    // TODO Change podcast.title to id from firebase
    var tmp = subscriptions[podcast.title];
    delete subscriptions[podcast.title];

    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));

    this.trigger(false, tmp, subscriptions);
  }
});

module.exports = store;

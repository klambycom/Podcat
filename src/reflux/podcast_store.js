var Firebase = require('firebase');
var moment = require('moment');
var rss = require('../rss.js');
var Reflux = require('reflux');
var actions = require('./podcast_actions.js');
var Alert = require('./alert.js').actions;

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
        var keysFromItems = Object.keys(podcast.items);
        var lastEpisode = podcast.items[keysFromItems[keysFromItems.length - 1]].pubDate;
        delete podcast.items;

        this.trigger({
          subscriptions: subscriptions,
          subscribed: typeof podcastFromSubscriptions !== 'undefined',
          podcast: podcast
        });

        // Update podcast from rss-feed if older than one hour
        if (moment(podcast.lastUpdate).utc().isBefore(moment.utc().subtract(1, 'hours'))) {
          rss.get(podcast.links.rss, function (error, result) {
            if (!error) {
              rss
                .parseEpisodes(result)
                .filter(function (x) {
                  return moment(new Date(x.pubDate))
                    .isAfter(moment(new Date(lastEpisode)));
                })
                .reverse()
                .forEach(function (x) {
                  // Add to firebase
                  var newItemRef = database.child('items').push();
                  x.podcast.id = id;
                  x.colors = podcast.colors;
                  newItemRef.setWithPriority(x, Date.now());
                }, this);
                // Update lastUpdate date
                database.update({ lastUpdate: moment.utc().format() });
            } else {
              Alert.warning('Podcast', 'Could not parse the RSS-feed', 'podcast.rss');
            }
          }.bind(this));
        }
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

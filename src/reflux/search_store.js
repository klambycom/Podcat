var Firebase = require('firebase');
var Reflux = require('reflux');
var actions = require('./search_actions.js');
var rss = require('../rss.js');
var Alert = require('./alert.js').actions;
var findColors = require('../find_colors.js');

var store = Reflux.createStore({
  listenables: actions,
  database: new Firebase('https://blinding-torch-6567.firebaseio.com/podcasts/'),
  urlPattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
  onTyping: function (input) {
    var url = input.match(this.urlPattern);

    if (url !== null) {
      this.trigger('url', url[0]);
    } else {
      this.trigger('search', input);
    }
  },
  onSearch: function (input) {
    var url = input.match(this.urlPattern);

    if (url !== null) {
      // Search for podcast in database
      this.database.orderByChild('url').equalTo(url[0]).once('value', function (data) {
        if (data.val() === null) {
          // Podcast not in database
          rss.get(url[0], function (error, result) {
            if (!error) {
              var json = rss.parse(result);
              json.links.rss = url[0];

              // Most common colors in cover image
              findColors(json.image, function (colors) {
                json.colors = colors.slice(0, 10);

                // Save podcast
                var post = this.database.push(json);

                // Save episodes
                var itemsRef = this.database
                  .child(post.key())
                  .child('items');

                rss.parseEpisodes(result).forEach(function (x, i, arr) {
                  var newItemRef = itemsRef.push();
                  x.podcast.id = post.key();
                  x.colors = json.colors;
                  newItemRef.setWithPriority(x, arr.length - i);
                });

                this.trigger('feed', post.key());
              }.bind(this));
            } else {
              Alert.warning(
                  'Podcast',
                  'Could not parse the RSS-feed. Wrong URL?',
                  'podcast.rss');
              this.trigger('error');
            }
          }.bind(this));
        } else {
          // Podcast found in database
          this.trigger('feed', Object.keys(data.val())[0]);
        }
      }, this);
    } else {
      this.trigger('search', input);
    }
  }
});

module.exports = store;

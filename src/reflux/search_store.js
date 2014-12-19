var Firebase = require('firebase');
var Reflux = require('reflux');
var actions = require('./search_actions.js');
var rss = require('../rss.js');

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
            var json = rss.parse(result);
            json.url = url[0];
            var post = this.database.push(json);
            this.trigger('feed', post.key());
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

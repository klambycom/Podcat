var Reflux = require('reflux');
var actions = require('./search_actions.js');

var store = Reflux.createStore({
  listenables: actions,
  urlPattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
  onSearch: function (input) {
    var url = input.match(this.urlPattern);

    if (url !== null) {
      this.trigger('feed', url[0]);
    } else {
      this.trigger('search', input);
    }
  }
});

module.exports = store;

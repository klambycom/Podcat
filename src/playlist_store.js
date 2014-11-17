var Reflux = require('reflux');
var actions = require('./playlist_actions.js');

var store = Reflux.createStore({
  init: function () {
    this.listenToMany(actions);
  },
  onPlay: function () {
  },
  onPause: function () {
  },
  onNext: function () {
  },
  onPrevious: function () {
  },
  onAdd: function () {
  },
  onRemove: function () {
  }
});

module.exports = store;

var Reflux = require('reflux');

var actions = Reflux.createActions([
  'play',
  'pause',
  'next',
  'previous',
  'add',
  'remove'
]);

var playlist = Reflux.createStore({
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

module.exports = actions;

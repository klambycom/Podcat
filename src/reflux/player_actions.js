var Reflux = require('reflux');

var actions = Reflux.createActions([
  'play',
  'pause',
  'toggle'
]);

module.exports = actions;

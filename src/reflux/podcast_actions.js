var Reflux = require('reflux');

var actions = Reflux.createActions([
  'init',
  'subscribe',
  'unsubscribe'
]);

module.exports = actions;

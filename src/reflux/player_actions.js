var Reflux = require('reflux');

var actions = Reflux.createActions([
  'play',
  'pause',
  'toggle',
  'updateTime'
]);

module.exports = actions;

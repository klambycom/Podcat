var Reflux = require('reflux');

var actions = Reflux.createActions([
  'play',
  'pause',
  'toggle',
  'reload'
]);

module.exports = actions;

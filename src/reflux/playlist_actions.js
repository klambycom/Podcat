var Reflux = require('reflux');

var actions = Reflux.createActions([
  'play',
  'pause',
  'next',
  'previous',
  'add',
  'remove',
  'dragOver',
  'dragEnd'
]);

module.exports = actions;

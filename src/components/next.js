var React = require('React');
var PlaylistActions = require('../reflux/playlist_actions.js');

var Next = React.createClass({
  onClick: function (e) {
    PlaylistActions.next();
    e.preventDefault();
  },
  render: function () {
    return (
        <a href="#" onClick={this.onClick} className="fa fa-fast-forward"></a>
        );
  }
});

module.exports = Next;

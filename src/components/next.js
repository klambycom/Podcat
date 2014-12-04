var React = require('react');
var PlaylistActions = require('../reflux/playlist_actions.js');

var Next = React.createClass({
  handleClick: function (e) {
    PlaylistActions.next();
    e.preventDefault();
  },
  render: function () {
    return (
        <a href="#" onClick={this.handleClick} className="fa fa-fast-forward"></a>
        );
  }
});

module.exports = Next;

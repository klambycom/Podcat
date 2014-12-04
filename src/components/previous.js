var React = require('react');
var PlaylistActions = require('../reflux/playlist_actions.js');

var Previous = React.createClass({
  handleClick: function (e) {
    PlaylistActions.previous();
    e.preventDefault();
  },
  render: function () {
    return (
        <a href="#" onClick={this.handleClick} className="fa fa-fast-backward"></a>
        );
  }
});

module.exports = Previous;

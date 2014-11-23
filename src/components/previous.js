var React = require('React');
var PlaylistActions = require('../reflux/playlist_actions.js');

var Previous = React.createClass({
  onClick: function (e) {
    PlaylistActions.previous();
    e.preventDefault();
  },
  render: function () {
    return (
        <a href="#" onClick={this.onClick} className="fa fa-fast-backward"></a>
        );
  }
});

module.exports = Previous;

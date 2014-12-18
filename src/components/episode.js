/** @jsx React.DOM */

var React = require('react');
var PlaylistActions = require('../reflux/playlist_actions');

var Episode = React.createClass({
  getInitialState: function () {
    return { added: false };
  },
  getDefaultProps: function () {
    return { play: true, add: true };
  },
  propTypes: {
    data: React.PropTypes.object.isRequired,
    play: React.PropTypes.bool,
    add: React.PropTypes.bool
  },
  componentDidMount: function () {
    this.setState({ added: this.props.data.queued });
  },
  handleClick: function (fnName) {
    return function (e) {
      // Trigger play or add action
      PlaylistActions[fnName]({
        title: this.props.data.title,
        image: this.props.data.image,
        audio_url: this.props.data.audio_url || this.props.data.file.url
      });

      // Change state of added
      if (fnName === 'add') { this.setState({ added: true }); }

      e.preventDefault();
    }.bind(this);
  },
  render: function () {
    var play = this.props.play && (<a href="#" onClick={this.handleClick('play')}>Play</a>);
    var add = this.props.add && (<a href="#" onClick={this.handleClick('add')}>Queue</a>);

    if (this.state.added) { add = 'Queued'; }

    return (
        <div className="episode">
          <h3>
            {this.props.data.title}
            {' '}{play}
            {' '}{add}
          </h3>
        </div>
        );
  }
});

module.exports = Episode;

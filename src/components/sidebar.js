/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router').Link;
var Reflux = require('reflux');
var PodcastActions = require('../reflux/podcast_actions.js');
var PodcastStore = require('../reflux/podcast_store.js');

var Sidebar = React.createClass({
  mixins: [ Reflux.listenTo(PodcastStore, 'onSubscriptionChange') ],
  getInitialState: function () {
    return { items: [] };
  },
  componentDidMount: function () {
    PodcastActions.init();
  },
  onSubscriptionChange: function (result) {
    this.setState({
      items: Object
        .keys(result.subscriptions)
        .map(function (x) { return result.subscriptions[x]; })
    });
  },
  render: function () {
    var subscriptions = 'You have not subscribed to any podcasts yet!';
    if (this.state.items.length > 0) {
      subscriptions = this.state.items.map(function (podcast, i) {
        return (
            <Link to='podcast' params={{id:podcast.id}} className="item" key={i}>
              <img src={podcast.image} alt={podcast.title} />
            </Link>
            );
      });
    }

    return (
        <div id="sidebar">
          <h2>Your subscriptions</h2>
          <p className="subscriptions">{subscriptions}</p>
          <Link to='/' className="add-podcast">Add new podcast</Link>
        </div>
        );
  }
});

module.exports = Sidebar;

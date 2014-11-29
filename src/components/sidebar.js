/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router').Link;
var Reflux = require('reflux');
var PodcastStore = require('../reflux/podcast_store.js');

var Sidebar = React.createClass({
  mixins: [ Reflux.listenTo(PodcastStore, 'onSubscriptionChange') ],
  getInitialState: function () {
    return { items: [] };
  },
  componentDidMount: function () {
    var subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || {};
    this.setState({
      items: Object
        .keys(subscriptions)
        .map(function (x) { return subscriptions[x]; })
    });
  },
  onSubscriptionChange: function (_, _, subscriptions) {
    this.setState({
      items: Object
        .keys(subscriptions)
        .map(function (x) { return subscriptions[x]; })
    });
  },
  render: function () {
    var subscriptions = 'You have not subscribed to any podcasts yet!';
    if (this.state.items.length > 0) {
      subscriptions = this.state.items.map(function (podcast, i) {
        return (
            <Link to='podcast' params={{id:podcast.title}} className="item" key={i}>
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

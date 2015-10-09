import React from 'react';
import { Link, IndexLink } from 'react-router';
import Reflux from 'reflux';
import * as Podcast from '../reflux/podcast.js';

export default React.createClass({
  name: 'Sidebar',

  mixins: [ Reflux.listenTo(Podcast.store, 'onSubscriptionChange') ],

  getInitialState() {
    return { items: [] };
  },

  componentDidMount() {
    Podcast.actions.init();
  },

  onSubscriptionChange(result) {
    let items = Object
      .keys(result.subscriptions)
      .map((x) => result.subscriptions[x]);

    this.setState({ items });
  },

  render() {
    let subscriptions = 'You have not subscribed to any podcasts yet!';
    if (this.state.items.length > 0) {
      subscriptions = this.state.items.map(function (podcast, i) {
        return (
            <Link to={`/podcast/${podcast.id}`} className="item" key={i} activeClassName="active">
              <img src={podcast.image} alt={podcast.title} />
            </Link>
            );
      });
    }

    return (
        <div id="sidebar">
          <h2>Your subscriptions</h2>
          <p className="subscriptions">{subscriptions}</p>
          <IndexLink to='/' className="add-podcast">Add new podcast</IndexLink>
        </div>
        );
  }
});

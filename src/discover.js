import React from "react";
import Relay from "react-relay";
import {Link} from "react-router";
import Feed from "./components/feed";

import "css/discover.less"

let Discover = React.createClass({
  getInitialState() {
    return {data: []};
  },

  renderFeed(feed, i) {
    return <Feed store={feed} key={i} />;
  },

  render() {
    return (
      <div className="discover">
        <div className="discover__section">
          <h2 className="discover__section__headline">Recommendations</h2>
          <div className="discover__section__content discover__section__content--row">
            {this.props.store.recommendations.map(this.renderFeed)}
          </div>
        </div>
        <Link to="/podcasts/11">Podcast</Link>
      </div>
    );
  }
});

Discover = Relay.createContainer(Discover, {
  fragments: {
    store: () => Relay.QL`
      fragment on User {
        recommendations(filter: NEWEST, limit: 4) {
          ${Feed.getFragment('store')}
        }
      }
    `
  }
});

export default Discover;

import React from "react";
import Relay from "react-relay";
import {Link} from "react-router";

import "css/components/feed.less"

let Feed = React.createClass({
  render() {
    const podcastUrl = `/podcasts/${this.props.store.slug}`;

    return (
      <div className="recommendation">
        <img
          src={this.props.store.image}
          alt={this.props.store.title}
          className="recommendation__image"
        />
        <Link to={podcastUrl} className="recommendation__title">
          {this.props.store.title}
        </Link>
      </div>
    );
  }
});

Feed = Relay.createContainer(Feed, {
  fragments: {
    store: () => Relay.QL`
      fragment on Podcast {
        slug
        title
        image(size: 200)
      }
    `
  }
});

export default Feed;

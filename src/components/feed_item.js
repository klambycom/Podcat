import React from "react";
import Relay from "react-relay";
import {Link} from "react-router";
    //console.log(this.props.id);
        //<Link to="/podcasts/11">Podcast</Link>

import "css/components/feed_item.less"

const FeedItem = React.createClass({
  url() {
    return `/podcasts/${this.props.store.podcastSlug}/episodes/${this.props.store.uuid}`;
  },

  render() {
    return (
      <div className="feed-item">
        <h2 className="feed-item__title">
          <Link to={this.url()}>{this.props.store.title}</Link>
        </h2>
        <p className="feed-item__meta">
          1988-04-26 12:00 &#8226; {this.props.store.duration}
        </p>
        <p className="feed-item__text">{this.props.store.subtitle}</p>
      </div>
    );
  }
});

export default Relay.createContainer(FeedItem, {
  fragments: {
    store: () => Relay.QL`
      fragment on Episode {
        title
        subtitle
        summary
        author
        duration
        uuid
        podcastSlug
        enclosure {
          length
          type
          url
        }
      }
    `
  }
});

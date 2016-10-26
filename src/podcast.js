import React from "react";
import Relay from "react-relay";
import FeedItem from "./components/feed_item";

import "css/podcast.less"

const Podcast = React.createClass({
  renderEpisode(episode, i) {
    return <FeedItem store={episode} key={i} />
  },

  render() {
    return (
      <div className="podcast">
        <header className="podcast__header">
          <img
            className="podcast__header__image"
            src={this.props.store.image}
            alt={this.props.store.title}
          />
          <div className="podcast__header__information">
            <h1 className="podcast__header__title">
              {this.props.store.title}
              <small className="podcast__header__title__author">
                {this.props.store.author}
              </small>
            </h1>
            <div className="podcast__header__summary">{this.props.store.summary}</div>
            <div className="podcast__header__meta">
              <a href={this.props.store.feedUrl}>RSS</a>
              <a href={this.props.store.link}>Homepage</a>
            </div>
          </div>
        </header>
        <div>{this.props.store.episodes.map(this.renderEpisode)}</div>
        <footer>
          <div>{this.props.store.copyright}</div>
          <div>Inserted at {this.props.store.insertedAt}</div>
          <div>Updated at {this.props.store.updatedAt}</div>
        </footer>
      </div>
    );
  }
});

export default Relay.createContainer(Podcast, {
  fragments: {
    store: () => Relay.QL`
      fragment on Podcast {
        title
        summary
        subtitle
        description
        author
        copyright
        image(size: 150)
        block
        explicit
        feedUrl
        link
        subscriberCount
        updatedAt
        insertedAt
        episodes(limit: 10) {
          ${FeedItem.getFragment('store')}
        }
      }
    `
  }
});

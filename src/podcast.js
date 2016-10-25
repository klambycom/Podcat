import React from "react";
import Relay from "react-relay";

const Podcast = React.createClass({
  renderEpisode(episode, i) {
    return (
      <div key={i}>
        <h2>{episode.title}</h2>
        <small>{episode.duration}</small>
        <p>{episode.subtitle}</p>
      </div>
    );
  },

  render() {
    return (
      <div>
        <header>
          <img src={this.props.store.image} alt={this.props.store.title} />
          <h1>{this.props.store.title} <small>{this.props.store.author}</small></h1>
          <div>{this.props.store.summary}</div>
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
        image(size: 100)
        block
        explicit
        feedUrl
        link
        subscriberCount
        updatedAt
        insertedAt
        episodes(limit: 10) {
          title
          subtitle
          summary
          author
          duration
          enclosure {
            length
            type
            url
          }
        }
      }
    `
  }
});

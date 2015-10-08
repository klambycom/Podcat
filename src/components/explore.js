import React from 'react';
import Search from './search';
import Firebase from 'firebase';
import { Link } from 'react-router';

export default React.createClass({
  name: 'Explore',

  getInitialState() {
    return { newestPodcasts: [] };
  },

  componentDidMount() {
    this.database = new Firebase('https://blinding-torch-6567.firebaseio.com/podcasts/');
    this.database.limitToFirst(15).on('child_added', this.onNewPodcast);
  },

  componentWillUnmount() {
    this.database.off('child_added', this.onNewPodcast);
  },

  onNewPodcast(snapshot) {
    let id = snapshot.key();
    let podcast = snapshot.val();
    let podcasts = this.state.newestPodcasts;

    podcasts.unshift({
      id: id,
      image: podcast.image,
      title: podcast.title,
      subtitle: podcast.subtitle
    });

    this.setState({ newestPodcasts: podcasts });
  },

  render() {
    return (
        <div id="explore">
          <h1>Explore</h1>
          <p>
            Find podcasts that you want to subscribe to. Search for a podcast or
            input url to a podcast-feed.
          </p>
          <Search placeholder="Search or url to rss-feed" />
          <p className="podcast-covers">
          {this.state.newestPodcasts.slice(0, 4).map(function (podcast, i) {
            return (
                <Link to={`/podcast/${podcast.id}`} className="item" key={i}>
                  <img src={podcast.image} alt={podcast.title} />
                </Link>
                );
          })}
          </p>

          <h2>New podcasts</h2>
          <p className="podcasts">
          {this.state.newestPodcasts.map(function (podcast, i) {
            return (
                <div className="item" key={i+4}>
                  <h3><Link to={`/podcast/${podcast.id}`}>{podcast.title}</Link></h3>
                  <div className="subtitle">{podcast.subtitle}</div>
                </div>
                );
          })}
          </p>
        </div>
        );
  }
});

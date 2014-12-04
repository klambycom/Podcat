/** @jsx React.DOM */

var React = require('react');
var Search = require('./search');
var Firebase = require('firebase');
var Link = require('react-router').Link;

var Explore = React.createClass({
  getInitialState: function () {
    return { newestPodcasts: [] };
  },
  componentDidMount: function () {
    this.database = new Firebase('https://blinding-torch-6567.firebaseio.com/podcasts/');
    this.database.limitToFirst(15).on('child_added', this.onNewPodcast);
  },
  componentWillUnmount: function () {
    this.database.off('child_added', this.onNewPodcast);
  },
  onNewPodcast: function (snapshot) {
    var id = snapshot.key();
    var podcast = snapshot.val();
    var podcasts = this.state.newestPodcasts;

    podcasts.push({
      id: id,
      image: podcast.image,
      title: podcast.title,
      subtitle: podcast.subtitle
    });

    this.setState({ newestPodcasts: podcasts });
  },
  render: function () {
    return (
        <div id="explore">
          <h1>Explore</h1>
          <p>
            Find podcasts that you want to subscribe to. Search for a podcast or
            input url to a podcast-feed.
          </p>
          <Search placeholder="Search or url to rss-feed" />
          <p className="podcast-covers">
          {this.state.newestPodcasts.slice(0, 3).map(function (podcast, i) {
            return (
                <Link to='podcast' params={{id:podcast.id}} className="item" key={i}>
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
                  <h3><Link to='podcast' params={{id:podcast.id}}>{podcast.title}</Link></h3>
                  <div className="subtitle">{podcast.subtitle}</div>
                </div>
                );
          })}
          </p>
        </div>
        );
  }
});

module.exports = Explore;

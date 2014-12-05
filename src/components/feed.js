/** @jsx React.DOM */

var React = require('react');
var Episode = require('./episode');

var Feed = React.createClass({
  getInitialState: function () {
    return { items: [] };
  },
  componentDidMount: function () {
    var self = this;
    var httpRequest = new XMLHttpRequest();
    var subscriptions = JSON.parse(localStorage.getItem('podcat.subscriptions'));
    var urls = Object
      .keys(subscriptions)
      .map(function (x) { return subscriptions[x].url; });

    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          var result = JSON.parse(httpRequest.responseText);
          var items = result.query.results.item.map(function (x) {
            return {
              title: x.title,
              subtitle: x.subtitle,
              image: x.image.href,
              file: { url: x.enclosure.url }
            };
          });
          self.setState({ items: items });

          // array with objects, that have title, subtitle, image.href,
          // enclosure.url
        }
      }
    };

    httpRequest.open(
        'GET',
        "http://query.yahooapis.com/v1/public/yql?q=select * from rss where url in ('" + urls.join("', '") + "') | sort(field=\"pubdate\", descending=\"true\")&format=json",
        true);
    httpRequest.send(null);
  },
  render: function () {
    // No episodes
    var episodes = (
        <div>
          You have no episodes in your feed. Have you subscribed to any podcasts?
        </div>
        );

    // List episodes
    if (this.state.items.length > 0) {
      episodes = this.state.items.map(function (item, i) {
        return (
            <Episode
              key={i}
              title={item.title}
              image={item.image}
              audio_url={item.file.url} />
            );
      });
    }

    return (
        <div id="feed">
          <h1>Feed</h1>
          {episodes}
        </div>
        );
  }
});

module.exports = Feed;

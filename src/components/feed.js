var React = require('react');
var Episode = require('./episode');
var LoadMore = require('./load_more.js');
var Firebase = require('firebase');
var moment = require('moment');
var storage = require('../playlist_storage.js');

var reverseDot = function (a) { return function (b) { return a[b]; }; };

var Feed = React.createClass({
  getInitialState: function () {
    return { items: [], show: 15 };
  },
  componentDidMount: function () {
    this.firebase = new Firebase('https://blinding-torch-6567.firebaseio.com/podcasts');
    this.subscriptions = JSON.parse(localStorage.getItem('podcat.subscriptions')) || {};

    // Init data
    var nrOfSubs = Object.keys(this.subscriptions).length;
    var counter = 0;
    var items = [];
    Object.keys(this.subscriptions).forEach(function (x) {
      this.firebase
        .child(x)
        .child('items')
        .limitToLast(50)
        .once('value', function (snapshot) {
          var data = snapshot.val();
          items = items.concat(
              Object
                .keys(data)
                // Convert object to array
                .map(reverseDot(data))
                // Only episodes newer than 2 months
                .filter(function (x) {
                  return moment
                    .utc(x.pubDate)
                    .isAfter(moment.utc().subtract(2, 'month'));
                })
                // Check if episode is queued
                .map(function (x) {
                  x.queued = storage.indexOf({ audio_url: x.file.url }) >= 0;
                  return x;
                }));

          if ((counter += 1) === nrOfSubs) {
            // Sort items
            items.sort(function (a, b) {
              var aa = moment.utc(a.pubDate);
              var bb = moment.utc(b.pubDate);

              if (aa.isBefore(bb)) {
                return 1;
              }
              if (aa.isAfter(bb)) {
                return -1;
              }
              return 0;
            });
            this.setState({ items: items });
          }
        }.bind(this));
    }, this);
  },
  handleLoadMore: function (n) { this.setState({ show: n }); },
  render: function () {
    // No episodes
    var episodes = (
        <div>
          You have no episodes in your feed. Have you subscribed to any podcasts?
        </div>
        );

    // List episodes
    if (this.state.items.length > 0) {
      episodes = this.state.items.slice(0, this.state.show).map(function (item, i) {
        return <Episode key={i} data={item} />;
      });
    }

    return (
        <div id="feed">
          <h1>Feed</h1>
          <div>{episodes}</div>

          <LoadMore onMore={this.handleLoadMore} perPage={15} total={this.state.items.length}>
            Load more episodes
          </LoadMore>
        </div>
        );
  }
});

module.exports = Feed;

/** @jsx React.DOM */

var React = require('react');
var Episode = require('./episode');
var Firebase = require('firebase');
var moment = require('moment');

var reverseDot = function (a) { return function (b) { return a[b]; }; };

var Feed = React.createClass({
  getInitialState: function () {
    return { items: [] };
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
        .limitToLast(10)
        .once('value', function (snapshot) {
          var data = snapshot.val();
          items = items.concat(Object.keys(data).map(reverseDot(data)));

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
        return <Episode key={i} data={item} />;
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

/** @jsx React.DOM */

var React = require('react');
var Search = require('./search');

var Explore = React.createClass({
  render: function () {
    return (
        <div id="explore">
          <h1>Explore</h1>
          <p>
            Find podcasts that you want to subscribe to. Search for a podcast or
            input url to a podcast-feed.
          </p>
          <Search placeholder="Search or url to rss-feed" />
          <h2>New podcasts</h2>
          <p>TODO</p>
          <h2>Popular podcasts</h2>
          <p>TODO</p>
        </div>
        );
  }
});

module.exports = Explore;

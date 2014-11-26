/** @jsx React.DOM */

var React = require('react');

var Explore = React.createClass({
  render: function () {
    return (
        <div id="explore">
          <h1>Explore</h1>
          <p>
            Find podcasts that you want to subscribe to. Search for a podcast or
            input url to a podcast-feed.
          </p>
          <div className="search">
            <div className="field"><input type="text" /></div>
            <div className="button"><button className="fa fa-search fa-2x" /></div>
          </div>
          <h2>New podcasts</h2>
          <p>TODO</p>
          <h2>Popular podcasts</h2>
          <p>TODO</p>
        </div>
        );
  }
});

module.exports = Explore;

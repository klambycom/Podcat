/** @jsx React.DOM */

var React = require('react');

var Sidebar = React.createClass({
  render: function () {
    return (
        <div id="sidebar">
          <h2>Your subscriptions</h2>
          <p>You have not subscribed to any podcasts yet!</p>
          <a href="#" className="add-podcast">Add new podcast</a>
        </div>
        );
  }
});

module.exports = Sidebar;

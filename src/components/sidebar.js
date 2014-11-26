/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router').Link;

var Sidebar = React.createClass({
  render: function () {
    return (
        <div id="sidebar">
          <h2>Your subscriptions</h2>
          <p>You have not subscribed to any podcasts yet!</p>
          <Link to='/' className="add-podcast">Add new podcast</Link>
        </div>
        );
  }
});

module.exports = Sidebar;

/** @jsx React.DOM */

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;

var Navigation = React.createClass({
  render: function () {
    return (
        <ul id='nav'>
          <li><Link to='Playlist'>Playlist</Link></li>
          <li><Link to='Feed'>Feed</Link></li>
        </ul>
        );
  }
});

module.exports = Navigation;

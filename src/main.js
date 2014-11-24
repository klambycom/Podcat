/** @jsx React.DOM */

var React = require('react');
var App = require('./components/app.js');
var Playlist = require('./components/playlist.js');
var Feed = require('./components/feed.js');

var Router = require('react-router');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;

var routes = (
    <Route name="app" path="/" handler={App}>
      <Route name="playlist" handler={Playlist} />
      <Route name="feed" handler={Feed} />
      <DefaultRoute handler={Feed} />
    </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('main'));
});

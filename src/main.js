/** @jsx React.DOM */

var React = require('react');
var App = require('./components/app.js');
var Playlist = require('./components/playlist.js');
var Feed = require('./components/feed.js');
var NotFound = require('./components/not_found.js');
var Explore = require('./components/explore.js');
var Podcast = require('./components/podcast.js');

var Router = require('react-router');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;
var NotFoundRoute = require('react-router').NotFoundRoute;

var routes = (
    <Route name="app" path="/" handler={App}>
      <NotFoundRoute handler={NotFound} />
      <Route name="playlist" handler={Playlist} />
      <Route name="feed" handler={Feed} />
      <Route name="podcast" handler={Podcast} path="podcast/:id" />
      <DefaultRoute handler={Explore} />
    </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('main'));
});

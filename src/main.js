var React = require('react');
var App = require('./components/app.js');
var Playlist = require('./components/playlist.js');
var Feed = require('./components/feed.js');
var NotFound = require('./components/not_found.js');
var Explore = require('./components/explore.js');
var Podcast = require('./components/podcast.js');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var routes = (
    <Route path="/" component={App}>
      <IndexRoute component={Explore} />
      <Route path="playlist" component={Playlist} />
      <Route path="feed" component={Feed} />
      <Route path="podcast/:id" component={Podcast} />
      <Route path="*" component={NotFound} />
    </Route>
);

React.render(<Router routes={routes} />, document.getElementById('main'));

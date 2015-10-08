import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/app.js';
import Playlist from './components/playlist.js';
import Feed from './components/feed.js';
import NotFound from './components/not_found.js';
import Explore from './components/explore.js';
import Podcast from './components/podcast.js';

let routes = (
    <Route path="/" component={App}>
      <IndexRoute component={Explore} />
      <Route path="playlist" component={Playlist} />
      <Route path="feed" component={Feed} />
      <Route path="podcast/:id" component={Podcast} />
      <Route path="*" component={NotFound} />
    </Route>
);

React.render(<Router routes={routes} />, document.getElementById('main'));

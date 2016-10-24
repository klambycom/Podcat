import React from "react";
import ReactDOM from "react-dom";
import Relay from "react-relay";

import {
  applyRouterMiddleware,
  Router,
  Route,
  IndexRoute,
  browserHistory
} from "react-router";
import useRelay from "react-router-relay";

import Layout from "./layout";
import Discover from "./discover";
import Playlist from "./playlist";
import Settings from "./settings";
import Podcast from "./podcast";
import Signin from "./signin";
import Register from "./register";
import NotFound from "./not_found";

import "css/index.less";

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer("http://localhost:4000/graphql")
);

const CurrentUserQueries = {
  store: () => Relay.QL`query { user }`
};

const PodcastQueries = {
  store: () => Relay.QL`query ($id: ID!) { podcast(id: $id) }`
};

ReactDOM.render((
  <Router
    history={browserHistory}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
  >
    <Route path="/" component={Layout}>
      <IndexRoute
        component={Discover}
        queries={CurrentUserQueries}
      />
      <Route path="playlist" component={Playlist} />
      <Route path="settings" component={Settings} />
      <Route
        path="podcasts/:id"
        component={Podcast}
        queries={PodcastQueries}
      />
      <Route path="signin" component={Signin} />
      <Route path="register" component={Register} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
), document.getElementById("app"));

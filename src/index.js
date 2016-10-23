import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";

import Layout from "./layout";
import Discover from "./discover";
import Playlist from "./playlist";
import Settings from "./settings";
import Podcast from "./podcast";
import Signin from "./signin";
import Register from "./register";
import NotFound from "./not_found";

import "css/index.less";

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Discover} />
      <Route path="playlist" component={Playlist} />
      <Route path="settings" component={Settings} />
      <Route path="podcasts/:id" component={Podcast} />
      <Route path="signin" component={Signin} />
      <Route path="register" component={Register} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
), document.getElementById("app"));

import React from "react";
import {Link} from "react-router";

import Search from "./components/search";
import User from "./components/user";

import "css/normalize.less";
import "css/header.less"
import "css/layout.less"

const Layout = React.createClass({
  render() {
    return (
      <div>
        <header className="header">
          <Link to="/" className="header__logo">Podcat.ninja</Link>
          <Search />
          <User />
        </header>
        <div className="layout">
          <div className="layout__page">
            {this.props.children}
          </div>
          <div className="layout__sidebar">
            <div className="layout__sidebar__content">
              <nav>
                <ul>
                  <li><Link to="/">Discover</Link></li>
                  <li><Link to="/playlist">Playlist</Link></li>
                  <li><Link to="/settings">Settings</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Layout;

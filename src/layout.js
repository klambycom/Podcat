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
            <div className="layout__sidebar__player">Play, pause and stuff.</div>
            <div className="layout__sidebar__subscriptions">
              <ul>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
              </ul>
            </div>
            <nav className="layout__sidebar__navigation">
              <ul>
                <li><Link to="/">Discover</Link></li>
                <li><Link to="/playlist">Playlist</Link></li>
                <li><Link to="/settings">Settings</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
});

export default Layout;

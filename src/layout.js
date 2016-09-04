import React from "react";
import {Link} from "react-router";

const Layout = React.createClass({
  render() {
    return (
      <div>
        <header>Podcat.ninja</header>
        {this.props.children}
        <div className="sidebar">
          <nav>
            <ul>
              <li><Link to="/">Discover</Link></li>
              <li><Link to="/playlist">Playlist</Link></li>
              <li><Link to="/settings">Settings</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
});

export default Layout;

import React from 'react';
import Player from './player';
import Navigation from './navigation';
import Sidebar from './sidebar';
import Alert from './alert';

export default React.createClass({
  name: 'App',

  render() {
    return (
        <div>
          <Navigation />
          <Alert />
          <div className="float-left">
            {this.props.children}
          </div>
          <div className="float-right">
            <Player />
            <Sidebar />
          </div>
          <div id='footer'></div>
        </div>
        );
  }
});

import React from 'react';

export default React.createClass({
  name: 'NotFound',

  render() {
    return (
        <div id="not-found">
          <h1>404</h1>
          <p>{this.props.children}</p>
        </div>
        );
  }
});

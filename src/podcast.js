import React from "react";

const Podcast = React.createClass({
  render() {
    return <div>Podcast {this.props.params.id}</div>;
  }
});

export default Podcast;

import React from "react";

const Feed = React.createClass({
  render() {
    console.log(this.props);
    return (
      <article>
        <header>
          <h1>{this.props.title}</h1>
          <h2>From {this.props.author}</h2>
          <p>{this.props.summary}</p>
        </header>
      </article>
    );
  }
});

export default Feed;

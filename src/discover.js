import React from "react";
import Feed from "./components/feed";

const Discover = React.createClass({
  getInitialState() {
    return {data: []};
  },

  loadData() {
    console.log(this);

    fetch("http://95.85.33.102/api/feeds")
      .then(response => response.json())
      .then(json => this.setState({data: json.data}));
  },

  componentDidMount() {
    this.loadData();
  },

  renderFeed(feed, i) {
    return <Feed
      title={feed.title}
      author={feed.author}
      copyright={feed.copyright}
      summary={feed.summary}
      images={feed.images}
      key={i} />;
  },

  render() {
    console.log(this.state);
    return (
      <div>
        {this.state.data.map(this.renderFeed)}
      </div>
    );
  }
});

export default Discover;

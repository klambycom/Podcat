import React from "react";

import "css/search.less"

const Search = React.createClass({
  render() {
    return (
      <div className="search">
        <input className="search__input" type="text" />
      </div>
    );
  }
});

export default Search;

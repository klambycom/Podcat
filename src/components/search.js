/** @jsx React.DOM */

var React = require('react');
var Reflux = require('reflux');
var SearchStore = require('../reflux/search_store.js');
var SearchActions = require('../reflux/search_actions.js');

var Search = React.createClass({
  mixins: [Reflux.listenTo(SearchStore, 'onSearch')],
  getInitialState: function () {
    return {
      icon: 'fa fa-2x fa-search',
      useEnter: false
    };
  },
  onSearch: function (type, result) {
    if (type === 'feed') {
      // Podcast-data downloaded, redirect to page for podcast
      console.log(result);
    } else if (type === 'url') {
      // User have entered a URL
      this.setState({ icon: 'fa fa-2x fa-plus', useEnter: true });
    } else {
      // User have entered a search term
      this.setState({ icon: 'fa fa-2x fa-search', useEnter: false });
    }
  },
  onInput: function (e) {
    SearchActions.typing(e.target.value);
  },
  onSubmit: function (e) {
    SearchActions.search(e.target.search_term.value);
    e.preventDefault();
  },
  render: function () {
    var enter = '';
    if (this.state.useEnter) {
      enter = <small>Press <code>ENTER &crarr;</code> to search</small>;
    }

    return (
        <div className="search">
          <div className="field">
            <form action="/" onSubmit={this.onSubmit}>
              <input
                type="text"
                name="search_term"
                id="search_term"
                onChange={this.onInput}
                {...this.props} />
            </form>
          </div>
          <div className="icon"><span className={this.state.icon}></span></div>
          {enter}
        </div>
        );
  }
});

module.exports = Search;

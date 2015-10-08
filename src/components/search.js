import React from 'react';
import Router from 'react-router';
import History from 'history';
import Reflux from 'reflux';
import SearchStore from '../reflux/search_store.js';
import SearchActions from '../reflux/search_actions.js';

export default React.createClass({
  name: 'Search',

  mixins: [ History, Reflux.listenTo(SearchStore, 'onSearch') ],

  getInitialState() {
    return {
      icon: 'fa fa-search',
      useEnter: false
    };
  },

  onSearch(type, result) {
    if (type === 'feed') {
      // Podcast-data downloaded, redirect to page for podcast
      this.history.pushState(null, `/podcast/${result}`);
    } else if (type === 'url') {
      // User have entered a URL
      this.setState({ icon: 'fa fa-plus', useEnter: true });
    } else if (type === 'error') {
      // Stop spinning
      this.setState({ icon: 'fa fa-' + (this.state.useEnter ? 'plus' : 'search') });
    } else {
      // User have entered a search term
      this.setState({ icon: 'fa fa-search', useEnter: false });
    }
  },

  handleInput(e) {
    SearchActions.typing(e.target.value);
  },

  handleSubmit(e) {
    SearchActions.search(e.target.search_term.value);
    this.setState({ icon: 'fa fa-spinner fa-spin' });
    e.preventDefault();
  },

  render() {
    let enter = '';
    if (this.state.useEnter) {
      enter = <small>Press <code>ENTER &crarr;</code> to search</small>;
    }

    return (
        <div className="search">
          <div className="field">
            <form action="/" onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="search_term"
                id="search_term"
                onChange={this.handleInput}
                {...this.props} />
            </form>
          </div>
          <div className="icon"><span className={this.state.icon}></span></div>
          {enter}
        </div>
        );
  }
});

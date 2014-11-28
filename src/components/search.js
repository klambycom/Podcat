/** @jsx React.DOM */

var React = require('react');
var Reflux = require('reflux');
var SearchStore = require('../reflux/search_store.js');
var SearchActions = require('../reflux/search_actions.js');

var Search = React.createClass({
  mixins: [Reflux.listenTo(SearchStore, 'onSearch')],
  getInitialState: function () {
    return { icon: 'fa fa-2x fa-search' };
  },
  onInput: function (e) {
    SearchActions.search(e.target.value);
  },
  onSearch: function (type) {
    if (type === 'search') {
      this.setState({ icon: 'fa fa-2x fa-search' });
    } else if (type === 'feed') {
      this.setState({ icon: 'fa fa-2x fa-plus' });
    }
  },
  render: function () {
    return (
        <div className="search">
          <div className="field">
            <input
              type="text"
              onChange={this.onInput}
              {...this.props} />
          </div>
          <div className="icon"><span className={this.state.icon}></span></div>
        </div>
        );
  }
});

module.exports = Search;

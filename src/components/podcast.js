/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var PodcastStore = require('../reflux/podcast_store.js');
var PodcastActions = require('../reflux/podcast_actions.js');

var Podcast = React.createClass({
  mixins: [ Router.State, Reflux.listenTo(PodcastStore, 'onSubscriptionChange') ],
  getInitialState: function () {
    return {
      items: [],
      subscribed: false,
      selectedPodcast: this.getParams().id
    };
  },
  componentDidMount: function () {
    PodcastActions.init(this.getParams().id);
  },
  componentDidUpdate: function () {
    // Update component if params (id) is changed
    if (this.state.selectedPodcast !== this.getParams().id) {
      this.setState({ selectedPodcast: this.getParams().id });
      PodcastActions.init(this.getParams().id);
    }
  },
  onSubscriptionChange: function (result) {
    // Update subscribe/unsubscribe button
    if (typeof result.subscribed !== 'undefined') {
      this.setState({ subscribed: result.subscribed });
    }
    
    // Update podcast data
    if (typeof result.podcast !== 'undefined') {
      this.setState(result.podcast);
    }
  },
  onSubscribe: function (e) {
    if (this.state.subscribed) {
      PodcastActions.unsubscribe(this.getParams().id);
    } else {
      PodcastActions.subscribe(this.getParams().id, this.state);
    }

    e.preventDefault();
  },
  render: function () {
    return (
        <div id="podcast">
          <img src={this.state.image} alt={this.state.title} />
          <div className="header">
            <h1>{this.state.title}</h1>
            <a
              href="#"
              className={this.state.subscribed ? 'unsubscribe' : 'subscribe'}
              onClick={this.onSubscribe}>
              {this.state.subscribed ? 'Unsubscribe' : 'Subscribe'}</a>
          </div>
          <p>{this.state.summary}</p>
          <small>{this.state.author}</small>
          <div className="clear"></div>

          <h2>Episodes</h2>
          <table>
            <thead>
              <tr>
                <td>Duration</td>
                <td>Title</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map(function (episode, i) {
                return (
                    <tr key={i}>
                      <td>{episode.file.duration}</td>
                      <td>{episode.title}</td>
                      <td><a href="#">More</a></td>
                    </tr>
                    );
              }.bind(this))}
            </tbody>
          </table>
          
        </div>
        );
  }
});

module.exports = Podcast;

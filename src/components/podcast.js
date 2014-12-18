/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var PodcastStore = require('../reflux/podcast_store.js');
var PodcastActions = require('../reflux/podcast_actions.js');
var NotFound = require('./not_found.js');
var Episode = require('./episode.js');

var Podcast = React.createClass({
  mixins: [ Router.State, Reflux.listenTo(PodcastStore, 'onSubscriptionChange') ],
  getInitialState: function () {
    return {
      items: [],
      subscribed: false,
      notFound: false,
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
      if (result.podcast === null) {
        this.setState({ notFound: true });
      } else {
        this.setState({ notFound: false });
        this.setState(result.podcast);
      }
    }
  },
  handleSubscribe: function (e) {
    if (this.state.subscribed) {
      PodcastActions.unsubscribe(this.getParams().id);
    } else {
      PodcastActions.subscribe(this.getParams().id, this.state);
    }

    e.preventDefault();
  },
  render: function () {
    if (this.state.notFound) {
      return (<NotFound>There is no podcast on this url.</NotFound>);
    }

    return (
        <div id="podcast">
          <img src={this.state.image} alt={this.state.title} />
          <div className="header">
            <h1>{this.state.title}</h1>
            <a
              href="#"
              className={this.state.subscribed ? 'unsubscribe' : 'subscribe'}
              onClick={this.handleSubscribe}>
              {this.state.subscribed ? 'Unsubscribe' : 'Subscribe'}</a>
          </div>
          <p>{this.state.summary}</p>
          <small>{this.state.author}</small>
          <div className="clear"></div>

          <h2>Episodes</h2>
          <p>
            {this.state.items.map(function (item, i) {
              return (
                  <Episode
                    key={i}
                    queued={item.queued}
                    title={item.title}
                    image={item.image}
                    audio_url={item.file.url} />
                  );
            }.bind(this))}
          </p>
          
        </div>
        );
  }
});

module.exports = Podcast;

/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Firebase = require('firebase');
var PodcastStore = require('../reflux/podcast_store.js');
var PodcastActions = require('../reflux/podcast_actions.js');
var NotFound = require('./not_found.js');
var Episode = require('./episode.js');
var storage = require('../playlist_storage.js');

var hashCode = function(str) {
  // Source: http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
  var hash = 0, i, chr, len;
  if (str.length === 0) { return hash; }
  for (i = 0, len = str.length; i < len; i += 1) {
    chr = str.charCodeAt(i);
    /* jshint ignore:start */
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
    /* jshint ignore:end */
  }
  return hash;
};

var Podcast = React.createClass({
  mixins: [ Router.State, Reflux.listenTo(PodcastStore, 'onSubscriptionChange') ],
  getInitialState: function () {
    return {
      items: [],
      links: {},
      subscribed: false,
      notFound: false,
      selectedPodcast: this.getParams().id
    };
  },
  componentDidMount: function () {
    PodcastActions.init(this.getParams().id);

    // Get episodes from firebase
    this.itemsRef = new Firebase(
        'https://blinding-torch-6567.firebaseio.com/podcasts/' + this.getParams().id + '/items');
    this.itemsRef.orderByPriority().on('child_added', this.onItemAdded);
  },
  componentDidUnmount: function () {
    this.itemsRef.off('child_added', this.onItemAdded);
  },
  componentDidUpdate: function () {
    // Update component if params (id) is changed
    if (this.state.selectedPodcast !== this.getParams().id) {
      this.setState({ selectedPodcast: this.getParams().id });
      this.itemsRef.off('child_added', this.onItemAdded);
      this.componentDidMount();
    }
  },
  onItemAdded: function (data) {
    var item = data.val();
    item.queued = storage.indexOf({ audio_url: item.file.url }) >= 0;
    item.id = data.key();
    this.state.items.unshift(item);
    // TODO forceUpdate later when new episodes
    if (this.state.items.length < 11) { this.forceUpdate(); }
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

    var bgColor = {};
    if (typeof this.state.colors !== 'undefined') {
      var rgb = this.state.colors[0];
      bgColor = {
        backgroundColor: 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')'
      };
    }

    return (
        <div id="podcast">
          <div className="info" style={bgColor}>
            <img src={this.state.image} alt={this.state.title} />
            <h1>{this.state.title}</h1>
            <p>{this.state.summary}</p>
            <small>{this.state.author}</small>
            <div className="links">
              <div className="left">
                <a href={this.state.links.rss}><span className="fa fa-rss"></span></a>
                <a href={this.state.links.web}><span className="fa fa-link"></span></a>
              </div>
              <a
                href="#"
                className={this.state.subscribed ? 'unsubscribe' : 'subscribe'}
                onClick={this.handleSubscribe}>
                {this.state.subscribed ? 'Unsubscribe' : 'Subscribe'}</a>
            </div>
            <div className="clear"></div>
          </div>

          <div className="episodes">
            <h2>Episodes</h2>
            <p>
              {this.state.items.slice(0, 10).map(function (item, i) {
                return <Episode key={hashCode(item.file.url) + i} data={item} />;
              })}
            </p>
          </div>
        </div>
        );
  }
});

module.exports = Podcast;

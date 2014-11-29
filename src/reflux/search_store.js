var Reflux = require('reflux');
var actions = require('./search_actions.js');

var getRSS = function (url, fn) {
  var httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var result = JSON.parse(httpRequest.responseText);
        fn(null, result.query.results.rss.channel);
      } else {
        fn('ERROR', null);
      }
    }
  };

  httpRequest.open(
      'GET',
      "http://query.yahooapis.com/v1/public/yql?q=select * from xml where url='" + url + "'&format=json",
      true);
  httpRequest.send(null);
};

var processFeedData = function (feed) {
  var itemData = function (x) {
    return {
      title: x.title || 'No title',
      summary: x.subtitle,
      pubDate: x.pubDate,
      link: x.link,
      explicit: x.explicit,
      file: {
        duration: x.duration,
        type: (x.enclosure && x.enclosure.type),
        url: (x.enclosure && x.enclosure.url)
      },
      image: x.image && x.image.href
    };
  };

  return {
    title: feed.title || 'No title',
    author: feed.author || 'No author',
    copyright: feed.copyright,
    image: feed.image[0] && feed.image[0].url,
    category: (feed.category && feed.category.text) || 'No category',
    summary: feed.summary || 'No summary',
    description: feed.description || 'No description',
    subtitle: feed.subtitle || 'No subtitle',
    lastUpdate: feed.lastBuildDate,
    explicit: feed.explicit,
    keywords: (feed.keywords && feed.keywords.split(',')) || 'No keywords',
    items: feed.item.map(itemData)
  };
};

var store = Reflux.createStore({
  listenables: actions,
  urlPattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
  onTyping: function (input) {
    var url = input.match(this.urlPattern);

    if (url !== null) {
      this.trigger('url', url[0]);
    } else {
      this.trigger('search', input);
    }
  },
  onSearch: function (input) {
    var url = input.match(this.urlPattern);

    if (url !== null) {
      getRSS(url[0], function (error, result) {
        // Save for debugging, TODO remember to remove!
        sessionStorage.setItem('last_result', JSON.stringify(result));

        var json = processFeedData(result);
        // TODO Change to firebase later.
        sessionStorage.setItem(json.title, JSON.stringify(json));
        this.trigger('feed', json.title);
      }.bind(this));
    } else {
      this.trigger('search', input);
    }
  }
});

module.exports = store;

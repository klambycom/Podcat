var Firebase = require('firebase');
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
  var itemData, keywords, image, category, description;

  itemData = function (x) {
    return {
      title: x.title || 'No title',
      summary: x.subtitle || 'Unknown',
      pubDate: x.pubDate || 'Unknown',
      link: x.link || 'Unknown',
      explicit: x.explicit || 'Unknown',
      file: {
        duration: x.duration || 0,
        type: (x.enclosure && x.enclosure.type) || 'Unknown',
        url: (x.enclosure && x.enclosure.url) || 'Unknown'
      },
      image: (x.image && x.image.href) || 'Unknown'
    };
  };

  keywords = function(words) {
    if (Array.isArray(words)) {
      return words[0].split(',');
    }
    return words.split(',');
  };

  image = function (img) {
    if (Array.isArray(img) && typeof img[0].url !== 'undefined') {
      return img[0].url;
    }
    if (typeof img.href !== 'undefined') {
      return img.href;
    }
  };

  category = function (category) {
    if (Array.isArray(category)) {
      return category[0].content;
    }
    return category.text;
  };

  description = function (desc) {
    if (Array.isArray(desc)) {
      return desc[1].content;
    }
    return desc;
  };

  return {
    title: feed.title || 'No title',
    author: feed.author || 'No author',
    copyright: feed.copyright || 'No copyright',
    image: feed.image && image(feed.image),
    category: (feed.category && category(feed.category)) || 'No category',
    summary: feed.summary || 'No summary',
    description: description(feed.description) || 'No description',
    subtitle: feed.subtitle || 'No subtitle',
    lastUpdate: feed.lastBuildDate || 'Unknown',
    explicit: feed.explicit || 'Unknown',
    keywords: feed.keywords && keywords(feed.keywords),
    items: feed.item.map(itemData)
  };
};

var store = Reflux.createStore({
  listenables: actions,
  database: new Firebase('https://blinding-torch-6567.firebaseio.com/podcasts/'),
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
      // Search for podcast in database
      this.database.orderByChild('url').equalTo(url[0]).once('value', function (data) {
        if (data.val() === null) {
          // Podcast not in database
          getRSS(url[0], function (error, result) {
            var json = processFeedData(result);
            json.url = url[0];
            var post = this.database.push(json);
            this.trigger('feed', post.key());
          }.bind(this));
        } else {
          // Podcast found in database
          this.trigger('feed', Object.keys(data.val())[0]);
        }
      }, this);
    } else {
      this.trigger('search', input);
    }
  }
});

module.exports = store;

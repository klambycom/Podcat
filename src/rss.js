var moment = require('moment');

var getRSS = function (url, fn) {
  var httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var result = JSON.parse(httpRequest.responseText);
        fn(null, result.query.results.rss.channel);
        window.latestPodcast = result.query.results.rss.channel;
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

var image = function (img) {
  if (Array.isArray(img)) {
    var imgurl = img.reduce(function (acc, x) {
      return (typeof x.href !== 'undefined') ? x.href : acc;
    }, '');

    if (imgurl === '') {
      imgurl = img.reduce(function (acc, x) {
        return (typeof x.url !== 'undefined') ? x.href : acc;
      }, '');
    }

    return imgurl;
  }
  if (typeof img.href !== 'undefined') {
    return img.href;
  }
};

var parseEpisodes = function (feed) {
  var podcastImage = feed.image && image(feed.image);

  return feed.item.map(function (x) {
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
      image: {
        episode: (x.image && x.image.href) || podcastImage,
        podcast: podcastImage
      }
    };
  });
};

var parsePodcast = function (feed) {
  var keywords, category, description, pubDate;

  keywords = function(words) {
    if (Array.isArray(words)) {
      return words[0].split(',');
    }
    return words.split(',');
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

  pubDate = function (feed) {
    return feed.lastBuildDate || feed.pubDate;
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
    lastUpdate: moment.utc().format(),
    explicit: feed.explicit || 'Unknown',
    keywords: (feed.keywords && keywords(feed.keywords)) || [],
    items: parseEpisodes(feed)
  };
};

module.exports = {
  get: getRSS,
  parse: parsePodcast,
  parseEpisodes: parseEpisodes
};

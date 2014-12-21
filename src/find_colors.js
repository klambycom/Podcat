var compose = function () {
  var fns = arguments;
  return function (args) {
    for (var i = fns.length - 1; i >= 0; i -= 1) {
      args = fns[i].call(this, args);
    }
    return args;
  };
};

var pixels = function (path, callback) {
  var img = new Image();
  var context = document.createElement('canvas').getContext('2d');

  img.crossOrigin = 'Anonymous';

  img.addEventListener('load', function () {
    context.drawImage(img, 0, 0);
    var colors = [], d = context.getImageData(0, 0, img.width, img.height).data;
    for (var i = 0; i < d.length; i += 4) {
      var index = d[i] + d[i + 1] + d[i + 2] + (255 - d[i + 3]);

      if (typeof colors[index] === 'undefined') {
        colors[index] = { r: d[i], g: d[i + 1], b: d[i + 2], a: d[i + 3], size: 1 };
      } else {
        colors[index].size += 1;
      }
    }
    callback(colors);
  });

  img.src = path;
};

var findColors = function (path, callback) {
  var reindex = function (colors) {
    return colors.filter(function (x) { return typeof x !== 'undefined' });
  };

  var sort = function (colors) {
    return colors.sort(function (a, b) {
      if (a.size > b.size) { return -1; }
      if (a.size < b.size) { return 1; }
      return 0;
    });
  };

  var removeLightColors = function (colors) {
    var filtered = colors.filter(function (x) {
      return (x.r < 170) && (x.g < 170) && (x.b < 170);
    });
    return filtered.length > 0 ? filtered : colors;
  };

  var removeBlackColors = function (colors) {
    var filtered = colors.filter(function (x) {
      return (x.r > 20) && (x.g > 20) && (x.b > 20);
    });
    return filtered.length > 0 ? filtered : [{ r: 50, g: 50, b: 50 }];
  };

  // Forgot about CORS. I only tried with local images when developing. And now
  // I have to cheat using a proxy.
  pixels(
      'http://proxy.klamby.com/?url=' + path,
      compose(callback, sort, removeBlackColors, removeLightColors, reindex));
};

module.exports = findColors;

var all = function (storage, id) {
  return JSON.parse(storage.getItem(id)) || [];
};

var removeFirst = function (storage, id) {
  var queue = all(storage, id);
  var removed = queue.shift();
  storage.setItem(id, JSON.stringify(queue));
  return removed;
};

var storage = {
  ID: 'playlist.queue',
  all: function () { return all(localStorage, this.ID); },
  add: function (item) {
    if (item === null) { return; }

    var queue = this.all();
    queue.push(item);
    localStorage.setItem(this.ID, JSON.stringify(queue));
  },
  indexOf: function (item) {
    return this.all().reduce(function (acc, x, i) {
      return x.audio_url === item.audio_url ? i : acc;
    }, -1);
  },
  addFirst: function (item) {
    var queue = this.all();
    queue.unshift(item);
    localStorage.setItem(this.ID, JSON.stringify(queue));
  },
  moveFirst: function (index) {
    var queue = this.all();
    var removed = queue.splice(index, 1);
    queue.unshift(removed[0]);
    localStorage.setItem(this.ID, JSON.stringify(queue));
  },
  update: function (obj) {
    var queue = this.all();
    Object.keys(obj).forEach(function (key) {
      queue[0][key] = obj[key];
    });
    localStorage.setItem(this.ID, JSON.stringify(queue));
  },
  remove: function () { return removeFirst(localStorage, this.ID); },
  history: {
    ID: 'playlist.history',
    all: function () { return all(sessionStorage, this.ID); },
    add: function (item) {
      if (item === null) { return; }

      // Add first
      var queue = this.all();
      queue.unshift(item);
      sessionStorage.setItem(this.ID, JSON.stringify(queue));
    },
    remove: function () { return removeFirst(sessionStorage, this.ID); }
  }
};

module.exports = storage;

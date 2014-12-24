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
  save: function (items) {
    localStorage.setItem(this.ID, JSON.stringify(items));
  },
  add: function (item) {
    if (item === null) { return; }

    var queue = this.all();
    queue.push(item);
    this.save(queue);
  },
  indexOf: function (item) {
    return this.all().reduce(function (acc, x, i) {
      return x.audio_url === item.audio_url ? i : acc;
    }, -1);
  },
  addFirst: function (item) {
    var queue = this.all();
    queue.unshift(item);
    this.save(queue);
  },
  moveFirst: function (index) {
    var queue = this.all();
    var removed = queue.splice(index, 1);
    queue.unshift(removed[0]);
    this.save(queue);
  },
  moveUnder: function (item, to) {
    var toID = this.indexOf(to);
    this.remove(item);
    var items = this.all();
    items.splice(toID + 1, 0, item);
    this.save(items);
  },
  update: function (obj) {
    var queue = this.all();
    Object.keys(obj).forEach(function (key) {
      queue[0][key] = obj[key];
    });
    this.save(queue);
  },
  remove: function (item) {
    var index = this.indexOf(item);
    var items = this.all();
    items.splice(index, 1);
    this.save(items);
  },
  removeFirst: function () { return removeFirst(localStorage, this.ID); },
  peek: function () { return this.all()[1]; },
  empty: function () { return this.all().length <= 1; },
  clear: function () { localStorage.removeItem(this.ID); },
  history: {
    ID: 'playlist.history',
    all: function () { return all(sessionStorage, this.ID); },
    add: function (item) {
      if (item === null) { return; }

      // Add first
      var queue = this.all();
      queue.unshift(item);
      this.save(queue);
    },
    remove: function () { return removeFirst(sessionStorage, this.ID); }
  }
};

module.exports = storage;

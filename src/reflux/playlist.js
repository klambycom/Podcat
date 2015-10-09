import Reflux from 'reflux';
import storage from '../playlist_storage.js';
import AudioPlayer from '../audio_player.js';

export let actions = Reflux.createActions([
  'play',
  'pause',
  'next',
  'previous',
  'add',
  'remove',
  'dragOver',
  'dragEnd'
]);

export let store = Reflux.createStore({
  listenables: actions,

  init() {
    AudioPlayer.addEventListener('ended', this.ended.bind(this));
  },

  onPlay(episode) {
    let index = storage.indexOf(episode);

    if (index > -1) {
      // If episode is later in queue, move forward to first
      if (index > 0) {
        storage.moveFirst(index);
      }
    } else {
      // If episode is not in queue, add first in queue
      storage.addFirst(episode);
    }

    this.trigger(storage.all());
  },

  onPause(time) {
    // Save new start time
    storage.update({ start_time: time });
    this.trigger(storage.all());
  },

  onNext() {
    if (!storage.empty()) {
      // Remove first episode in queue
      let removed = storage.removeFirst();

      // Add removed episode to history
      storage.history.add(removed);

      this.trigger(storage.all());
    }
  },

  onPrevious() {
    // Remove from history and add first in queue
    let previous = storage.history.remove();
    actions.play(previous);
  },

  onAdd(episode) {
    // Add last in queue
    storage.add(episode);
    this.trigger(storage.all(), 'add');
  },

  onRemove(episode) {
    storage.remove(episode);
    this.trigger(storage.all(), 'remove');
  },

  ended() {
    if (storage.empty()) {
      // Remove playlist if last episode in playlist just ended
      storage.clear();
      this.trigger([]);
    } else {
      // Else play next episode in playlist
      this.onNext();
    }
  },

  dragOver(item) {
    this.dragTo = item;
  },

  dragEnd(item) {
    storage.moveUnder(item, this.dragTo);
    this.trigger(storage.all(), 'move');
  }
});

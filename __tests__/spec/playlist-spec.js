var pathActions = '../../src/reflux/playlist_actions.js';
jest.dontMock(pathActions);

var pathStore = '../../src/reflux/playlist_store.js';
jest.dontMock(pathStore);

describe('Playlist', function () {
  var PlaylistActions = require(pathActions);
  var PlaylistStore   = require(pathStore);

  describe('play', function () {
    it('should have play action', function () {
      expect(PlaylistActions.play).toBeDefined();
    });
  });

  describe('pause', function () {
    it('should have pause action', function () {
      expect(PlaylistActions.pause).toBeDefined();
    });
  });

  describe('next', function () {
    it('should have next action', function () {
      expect(PlaylistActions.next).toBeDefined();
    });
  });

  describe('previous', function () {
    it('should have previous action', function () {
      expect(PlaylistActions.previous).toBeDefined();
    });
  });

  describe('add', function () {
    it('should have add action', function () {
      expect(PlaylistActions.add).toBeDefined();
    });

    /*
    it('should save added episode to localStorage', function () {
      var value, flag;

      runs(function () {
        PlaylistActions.add('http://address.to/file.mp3');

        flag = false;
        value = [];

        localforage.getItem('playlist', function (err, v) {
          flag = true;
          value = v;
        });
      });

      waitsFor(function () {
        return flag;
      }, 'should have returned playlist', 500);

      runs(function () {
        expect(value).toContain('http://address.to/file.mp3');
      });
    });
    */
  });

  describe('remove', function () {
    it('should have remove action', function () {
      expect(PlaylistActions.remove).toBeDefined();
    });
  });
});

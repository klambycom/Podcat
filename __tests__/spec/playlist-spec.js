var path = '../../src/playlist.js';
jest.dontMock(path);

describe('Playlist', function () {
  var Playlist = require(path);

  describe('play', function () {
    it('should have play action', function () {
      expect(Playlist.play).toBeDefined();
    });
  });

  describe('pause', function () {
    it('should have pause action', function () {
      expect(Playlist.pause).toBeDefined();
    });
  });

  describe('next', function () {
    it('should have next action', function () {
      expect(Playlist.next).toBeDefined();
    });
  });

  describe('previous', function () {
    it('should have previous action', function () {
      expect(Playlist.previous).toBeDefined();
    });
  });

  describe('add', function () {
    it('should have add action', function () {
      expect(Playlist.add).toBeDefined();
    });
  });

  describe('remove', function () {
    it('should have remove action', function () {
      expect(Playlist.remove).toBeDefined();
    });
  });
});

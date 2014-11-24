var path = '../../src/components/episode.js';
jest.dontMock(path);

describe('Episode', function () {
  var React = require('react/addons');
  var Episode = require(path);
  var TestUtils = React.addons.TestUtils;

  describe('with play button', function () {
    var episode;

    beforeEach(function () {
      episode = TestUtils.renderIntoDocument(
          <Episode
            title="Episode One"
            image="image.png"
            audio_url="episode.mp3"
            play={true} />
          );
    });

    it('should have a play button', function () {
      var play_button = TestUtils.findRenderedDOMComponentWithTag(episode, 'a');
      expect(play_button.getDOMNode().textContent).toEqual('Spela avsnittet');
    });

    it('should have a title', function () {
      var title = TestUtils.findRenderedDOMComponentWithTag(episode, 'h3');
      expect(title.getDOMNode().textContent).toContain('Episode One');
    });

    /* TODO
    it('should play episode when link is clicked', function () {
      var onPlay = jest.genMockFunction();
      Episode.onPlay = onPlay;

      var play_button = TestUtils.findRenderedDOMComponentWithTag(episode, 'a');

      TestUtils.Simulate.click(play_button);
      expect(onPlay).toBeCalled();
    });
    */
  });

  describe('without play button', function () {
    var episode;

    beforeEach(function () {
      episode = TestUtils.renderIntoDocument(
          <Episode
            title="Episode One"
            image="image.png"
            audio_url="episode.mp3"
            play={false} />
          );
    });

    it('should not have a play button', function () {
      var title = TestUtils.findRenderedDOMComponentWithTag(episode, 'h3');
      expect(title.getDOMNode().textContent).not.toContain('Spela avsnittet');
    });
  });

  describe('default values', function () {
    var episode;

    beforeEach(function () {
      episode = TestUtils.renderIntoDocument(
          <Episode
            title="Episode One"
            image="image.png"
            audio_url="episode.mp3" />
          );
    });

    it('should have a play button', function () {
      var play_button = TestUtils.findRenderedDOMComponentWithTag(episode, 'a');
      expect(play_button.getDOMNode().textContent).toEqual('Spela avsnittet');
    });
  });
});

var path = '../../src/components/play_pause.js';
jest.dontMock(path);

describe('PlayPause', function () {
  var React = require('react/addons');
  var PlayPause = require(path);
  var TestUtils = React.addons.TestUtils;
  var link;

  beforeEach(function () {
    window.Audio = jest.genMockFunction();
    var instance = TestUtils.renderIntoDocument(<PlayPause />);
    link = TestUtils.findRenderedDOMComponentWithTag(instance, 'a');
  });

  it('should start with a play button', function () {
  });
});

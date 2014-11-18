/** @jsx React.DOM */

var React = require('react');
var Episode = require('./episode');

var Feed = React.createClass({
  render: function () {
    return (
        <div id="feed">
          <Episode
            key='1'
            title="Avsnitt 12 - Motionen om konungens återkomst"
            image="http://assets.podomatic.net/ts/14/05/32/kmbengtsson88/1400x1400_9885800.jpeg"
            audio_url="http://interasistmen.podomatic.com/enclosure/2014-11-17T15_52_52-08_00.mp3" />

          <Episode
            key='2'
            title="Kodsnack 77 - Ett helt annat universum av saker"
            image="http://static.libsyn.com/p/assets/2/b/3/1/2b31e735b8ae2a54/kodsnack3.png"
            audio_url="http://traffic.libsyn.com/kodsnack/Uppkopplade_prylar.mp3" />

          <Episode
            key='3'
            title="Kodsnack 76 - Fast på en viss punkt i verkligheten"
            image="http://static.libsyn.com/p/assets/2/b/3/1/2b31e735b8ae2a54/kodsnack3.png"
            audio_url="http://traffic.libsyn.com/kodsnack/singulariteten_frsk_2.mp3" />
        </div>
        );
  }
});

module.exports = Feed;

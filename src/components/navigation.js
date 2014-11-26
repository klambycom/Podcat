/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router').Link;

var Navigation = React.createClass({
  render: function () {
    return (
        <div id="navigation">
          <div className='title'><Link to='/'>Ninja Podcat</Link></div>
          <ul className='links'>
            <li><Link to='/'>Explore</Link></li>
            <li><Link to='playlist'>Playlist</Link></li>
            <li><Link to='feed'>Feed</Link></li>
          </ul>
        </div>
        );
  }
});

module.exports = Navigation;

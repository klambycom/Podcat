/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var Podcast = React.createClass({
  mixins: [ Router.State ],
  getInitialState: function () {
    return { items: [] };
  },
  componentDidMount: function () {
    var podcast = sessionStorage.getItem(this.getParams().id);
    console.log(JSON.parse(podcast));
    this.setState(JSON.parse(podcast));
  },
  render: function () {
    return (
        <div id="podcast">
          <img src={this.state.image} alt={this.state.title} />
          <div className="header">
            <h1>{this.state.title}</h1>
            <a href="" className="subscribe">Subscribe</a>
          </div>
          <p>{this.state.summary}</p>
          <small>{this.state.author}</small>
          <div className="clear"></div>

          <h2>Episodes</h2>
          <table>
            <thead>
              <tr>
                <td>Duration</td>
                <td>Title</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map(function (episode, i) {
                return (
                    <tr key={i}>
                      <td>{episode.file.duration}</td>
                      <td>{episode.title}</td>
                      <td><a href="#">More</a></td>
                    </tr>
                    );
              }.bind(this))}
            </tbody>
          </table>
          
        </div>
        );
  }
});

module.exports = Podcast;

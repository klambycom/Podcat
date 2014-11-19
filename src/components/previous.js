var React = require('React');

var Previous = React.createClass({
  onClick: function (e) {
    e.preventDefault();
  },
  render: function () {
    return (
        <a href="#" onClick={this.onClick} className="fa fa-fast-backward"></a>
        );
  }
});

module.exports = Previous;

var React = require('react');

var LoadMore = React.createClass({
  getInitialState: function () {
    return { page: 1 };
  },
  getDefaultProps: function () {
    return { page: 1, perPage: 10 };
  },
  propTypes: {
    initPage: React.PropTypes.number,
    total: React.PropTypes.number.isRequired,
    perPage: React.PropTypes.number,
    onMore: React.PropTypes.func.isRequired
  },
  componentDidMount: function () {
    this.setState({ page: this.props.initPage || 1 });
  },
  handleClick: function (e) {
    this.setState({ page: this.state.page + 1 });
    this.props.onMore((this.state.page + 1) * this.props.perPage);
    e.preventDefault();
  },
  render: function () {
    if (this.state.page * this.props.perPage < this.props.total) {
      return (
          <a href="#" className="show-more" onClick={this.handleClick}>{this.props.children}</a>
          );
    }

    return <span></span>;
  }
});

module.exports = LoadMore;

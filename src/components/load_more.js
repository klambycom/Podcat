import React from 'react';

export default React.createClass({
  name: 'LoadMore',

  getInitialState() {
    return { page: 1 };
  },

  getDefaultProps() {
    return { page: 1, perPage: 10 };
  },

  propTypes: {
    initPage: React.PropTypes.number,
    total: React.PropTypes.number.isRequired,
    perPage: React.PropTypes.number,
    onMore: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    this.setState({ page: this.props.initPage || 1 });
  },

  handleClick(e) {
    this.setState({ page: this.state.page + 1 });
    this.props.onMore((this.state.page + 1) * this.props.perPage);
    e.preventDefault();
  },

  render() {
    if (this.state.page * this.props.perPage < this.props.total) {
      return (
          <a href="#" className="show-more" onClick={this.handleClick}>{this.props.children}</a>
          );
    }

    return <span></span>;
  }
});

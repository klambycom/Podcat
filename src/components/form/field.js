import React from "react";

const FormField = React.createClass({
  getInitialState() {
    return {value: ""};
  },

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.onChange(event.target.value, this.props.name);
  },

  propTypes: {
    type: React.PropTypes.string,
    name: React.PropTypes.string,
    label: React.PropTypes.string
  },

  getDefaultProps() {
    return {type: "text"};
  },

  render() {
    return (
      <div className="form_field">
        <label for={this.props.name}>{this.props.label}</label>
        <input
          type={this.props.type}
          id={this.props.name}
          name={this.props.name}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
});

export default FormField;

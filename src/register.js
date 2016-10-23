import React from "react";
import FormField from "./components/form/field";

const Register = React.createClass({
  getInitialState() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },

  handleChange(value, name) {
    this.setState({[name]: value});
  },

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.name);
    console.log(this.state.email);
    console.log(this.state.password);
  },

  render() {
    return (
      <div className="register">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <FormField
            name="name"
            label="Name"
            onChange={this.handleChange}
          />
          <FormField
            name="email"
            label="E-mail"
            onChange={this.handleChange}
          />
          <FormField
            type="password"
            name="password"
            label="Password"
            onChange={this.handleChange}
          />
          <div className="form_btns">
            <input type="submit" className="form_btns__btn" value="Register" />
          </div>
        </form>
      </div>
    );
  }
});

export default Register;

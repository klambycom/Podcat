import React from "react";
import {Link} from "react-router";

import "../css/user.less"

const User = React.createClass({
  render() {
    return (
      <div className="user">
        <div className="user__text">
          <div className="user__text__signin">
            <Link to="/">Sign in</Link>
          </div>
          <small className="user__text__signup">
            or <Link to="/">create a new account</Link>
          </small>
        </div>
        <div className="user__avatar user__avatar--placeholder"></div>
      </div>
    );
  }
});

export default User;

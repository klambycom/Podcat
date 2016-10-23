import React from "react";
import {Link} from "react-router";

import "../css/user.less"

const User = React.createClass({
  render() {
    return (
      <div className="user">
        <div className="user__text">
          <div className="user__text__signin">
            <Link to="/signin">Sign in</Link>
          </div>
          <small className="user__text__register">
            or <Link to="/register">create a free account</Link>
          </small>
        </div>
        <div className="user__avatar user__avatar--placeholder"></div>
      </div>
    );
  }
});

export default User;

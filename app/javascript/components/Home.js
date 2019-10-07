import React, { Component } from "react";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
export default class Home extends Component {
  handleSuccessfulAuth = data => {
    this.props.handleLogin(data);
    this.props.history.push("/dashboard");
  };
  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        {/* <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} /> */}
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    );
  }
}

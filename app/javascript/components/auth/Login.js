import React, { Component } from "react";
import axios from "axios";
import "../../../assets/stylesheets/login"

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    emailR: "",
    passwordR: "",
    password_confirmationR: "",
    loginErrors: ""
  };
  handleLoginSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    axios
      .post(
        "/sessions",
        {
          user: {
            email: email,
            password: password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(err => {
        console.log("err:", err);
      });
  };
  handleRegisterSubmit = e => {
    e.preventDefault();
    const { emailR, passwordR, password_confirmationR } = this.state;
    console.log(emailR, passwordR, password_confirmationR);
    axios
      .post(
        "/registrations",
        {
          user: {
            email: emailR,
            password: passwordR,
            password_confirmation: password_confirmationR
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        console.log(response);
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(err => {
        console.log("err:", err);
      })
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      // <div>
      //   <form onSubmit={this.handleSubmit}>
      //     <input
            // type="text"
            // name="email"
            // placeholder="Email"
            // value={this.state.email}
            // onChange={this.handleChange}
            // required
      //     />
          // <input
            // type="password"
            // name="password"
            // placeholder="Password"
            // value={this.state.password}
            // onChange={this.handleChange}
            // required
          // />
      //     <button type="submit">Login</button>
      //   </form>
      // </div>
      <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Register!</h3>
                    <form onSubmit={this.handleRegisterSubmit}>
                        <div className="form-group">
                            <input type="text"
                            name="emailR"
                            placeholder="Email*"
                            value={this.state.emailR}
                            onChange={this.handleChange}
                            required
                            className="form-control" />
                        </div>
                        <div className="form-group">
                            <input 
                            type="password"
                            name="passwordR"
                            placeholder="Password*"
                            value={this.state.passwordR}
                            onChange={this.handleChange}
                            className="form-control"
                            required />
                        </div>
                        <div className="form-group">
                            <input 
                            type="password"
                            name="password_confirmationR"
                            placeholder="Password Confirmation*"
                            value={this.state.password_confirmationR}
                            onChange={this.handleChange}
                            className="form-control"
                            required />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btnSubmit" value="Register" />
                        </div>
                    </form>
                </div>
                <div className="col-md-6 login-form-2">
                    <h3>Login!</h3>
                    <form onSubmit={this.handleLoginSubmit}>
                        <div className="form-group">
                            <input type="text"
                              name="email"
                              placeholder="Email"
                              value={this.state.email}
                              onChange={this.handleChange}
                              required
                              className="form-control" />
                        </div>
                        <div className="form-group">
                            <input type="password"
                              name="password"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={this.handleChange}
                              className="form-control"
                              required />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btnSubmit" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
  }
}

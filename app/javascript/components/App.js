import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PortfolioContainer from "./PortfolioContainer";
import Home from "./Home";
import axios from "axios";

const csrfToken = document.querySelector('[name="csrf-token"]').content;
axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

export default class App extends Component {
  state = {
    loggedInStatus: "NOT_LOGGED_IN",
    user: {}
  };
  handleLogin = ({ user }) => {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user
    });
  };

  checkLoginStatus = () => {
    axios
      .get("/logged_in", { withCredentials: true })
      .then(res => {
        console.log(res);
        if (
          res.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.handleLogin(res.data.user);
        } else if (
          !res.data.logged_in &&
          this.state.loggedInStatus === "LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.checkLoginStatus();
  }
  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={props =>
                this.state.user ? (
                  <Home
                    {...props}
                    handleLogin={this.handleLogin}
                    loggedInStatus={this.state.loggedInStatus}
                  />
                ) : (
                  <PortfolioContainer
                    {...props}
                    loggedInStatus={this.state.loggedInStatus}
                  />
                )
              }
            />
            <Route
              exact
              path={"/dashboard"}
              render={props => (
                <PortfolioContainer
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path={"/login"}
              render={props => (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </Fragment>
    );
  }
}

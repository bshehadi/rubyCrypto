import React, { Component } from "react";
import Search from "./Search";
import Calculate from "./Calculate";

export default class PortfolioContainer extends Component {
  state = {
    name: "",
    portfolio: [],
    search_results: [],
    active_currency: null,
    amount: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        <Search handleChange={this.handleChange} />
        <Calculate />
      </div>
    );
  }
}

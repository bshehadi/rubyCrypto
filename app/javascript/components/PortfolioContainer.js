import React, { Component } from "react";
import Search from "./Search";
import Calculate from "./Calculate";
import axios from "axios";

export default class PortfolioContainer extends Component {
  state = {
    name: "",
    portfolio: [],
    search_results: [],
    active_currency: null,
    amount: ""
  };
  handleChange = e => {
    // this.setState({ [e.target.name]: e.target.value });
    axios
      .post("http://localhost:3000/search", { search: e.target.value })
      .then(data => {
        this.setState({ search_results: [...data.data.currencies] });
      })
      .catch(data => {
        console.log(data);
      });
    console.log(this.state.search_results);
  };
  handleSelect = id => {
    console.log(id);
  };
  render() {
    return (
      <div>
        <Search
          handleSelect={id => {
            this.handleSelect(id);
          }}
          searchResults={this.state.search_results}
          handleChange={this.handleChange}
        />
        <Calculate />
      </div>
    );
  }
}

import React, { Component } from "react";
import Search from "./Search";
import Calculate from "./Calculate";
import axios from "axios";
import Portfolio from "./Portfolio";
export default class PortfolioContainer extends Component {
  state = {
    portfolio: [],
    search_results: [],
    active_currency: null,
    amount: ""
  };

  componentDidMount(){
    axios.get("http://localhost:3000/transaction").then(({data})=>{
    console.log(data);
    this.setState({portfolio:data.transactions})
  })
  }
  handleChange = e => {
    // this.setState({ [e.target.name]: e.target.value });
    axios
      .post("http://localhost:3000/search", { search: e.target.value })
      .then(({ data }) => {
        this.setState({ search_results: [...data.currencies] });
      })
      .catch(data => {
        console.log(data);
      });
  };

  handleSelect = id => {
    const [activeCurrency] = this.state.search_results.filter(
      item => item.id === id
    );
    this.setState({ active_currency: activeCurrency, search_results: [] });
  };

  handleSubmit = e => {
    e.preventDefault();
    let currency = this.state.active_currency;
    let amount = this.state.amount;
    axios
      .post("http://localhost:3000/transaction", { currency_id: currency.id, rebalance: amount })
      .then(({ data }) => {
        this.setState({
          portfolio: [...this.state.portfolio, data.transaction],
          amount: "",
          active_currency: null
        });
      })
      .catch(data => {
        console.log(data);
      });
  };
  handleAmount = e => {
    if (e.target.name === "amount") {
      let regex = /[\D]/gi;
      let result = regex.exec(e.target.value);
      if (result) {
        return;
      }
    }
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const searchOrCalc = this.state.active_currency ? (
      <Calculate
        handleChange={this.handleAmount}
        handleSubmit={this.handleSubmit}
        active_currency={this.state.active_currency}
        amount={this.state.amount}
      />
    ) : (
      <Search
        handleSelect={id => {
          this.handleSelect(id);
        }}
        searchResults={this.state.search_results}
        handleChange={this.handleChange}
      />
    );
    return (
      <div className="grid">
        <div className="left">{searchOrCalc}</div>
        <div className="right">
          <Portfolio portfolio={this.state.portfolio} />
        </div>
      </div>
    );
  }
}

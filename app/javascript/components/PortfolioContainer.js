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
    amount: "",
    currencyBalance: {}
  };

  componentDidMount() {
    axios.get("/transaction").then(({ data }) => {
      this.setState({ portfolio: data.transactions }, async () => {
        let obj = this.state.currencyBalance;
        for (let i = 0; i < this.state.portfolio.length; i++) {
          const element = this.state.portfolio[i];
          if (obj[element.currency_id]) {
            obj[element.currency_id] =
              +obj[element.currency_id] + +element.rebalance;
          } else {
            obj[element.currency_id] = +element.rebalance;
          }
        }
        let priceObj = {};
        for (const key in obj) {
          let { data } = await axios.post("/getcurrencyprice", {
            currency_id: key
          });
          priceObj[key] = +data.currency_price * obj[key];
        }
        this.setState({ currencyBalance: priceObj });
      });
    });
  }
  handleChange = e => {
    // this.setState({ [e.target.name]: e.target.value });
    if (e.target.value) {
      axios
        .post("/search", { search: e.target.value })
        .then(({ data }) => {
          this.setState({ search_results: [...data.currencies] });
        })
        .catch(data => {
          console.log(data);
        });
    } else {
      this.setState({ search_results: [] });
    }
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
      .post("/transaction", { currency_id: currency.id, rebalance: amount })
      .then(({ data }) => {
        let obj = this.state.currencyBalance;
        if (obj[data.transaction.currency_id]) {
          for (const key in obj) {
            if (key == data.transaction.currency_id) {
              obj[key] =
                obj[key] +
                +data.transaction.priceBoughtAt * +data.transaction.rebalance;
            }
          }
        } else {
          obj[data.transaction.currency_id] = +data.transaction.priceBoughtAt;
        }
        this.setState({
          portfolio: [...this.state.portfolio, data.transaction],
          amount: "",
          active_currency: null,
          currencyBalance: obj
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
      <div className="grid d-flex">
        <div className="left col">{searchOrCalc}</div>
        <div className="right col">
          <Portfolio
            currencyBalance={this.state.currencyBalance}
            portfolio={this.state.portfolio}
          />
        </div>
      </div>
    );
  }
}

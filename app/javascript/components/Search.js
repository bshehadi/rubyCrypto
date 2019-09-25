import React, { Component } from "react";

export default class Search extends Component {
  render() {
    const searchResults = this.props.searchResults.map(curr => {
      return (
        <button
          key={curr.id}
          className="currency"
          onClick={() => {
            this.props.handleSelect(curr.id);
          }}
        >
          <li className="currency-list-item">
            <span>{curr.name} </span>
            <span className="currency_symbol">{curr.currency_symbol}</span>
          </li>
        </button>
      );
    });
    return (
      <div>
        <h1>Cryptocurrency Portfolio Calculator</h1>
        <form>
          <div className="form-group">
            <label>Search for a Currency:</label>
            <br />
            <input
              type="text"
              autoComplete="off"
              name="name"
              placeholder="Ex: Bitcoin, Litecoin, Ethereum..."
              value={this.props.name}
              className="field"
              onChange={this.props.handleChange}
            />
          </div>
        </form>
        <div className="currency-list">
          <ul>{searchResults}</ul>
        </div>
      </div>
    );
  }
}

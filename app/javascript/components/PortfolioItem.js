import React, { Component } from "react";

export default class PortfolioItem extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <div className="header">Currency: </div>
            <div className="text">{this.props.item.currency_name}</div>
          </div>
          <div className="col">
            <div className="header">Current Price:</div>
            <div className="text">{this.props.item.current_price}</div>
          </div>
          <div className="col">
            <div className="header">Amount in your Portfolio:</div>
            <div className="text">{this.props.item.amount}</div>
          </div>
          <div className="col">
            <div className="header">Current Value:</div>
            <div className="text">{this.props.item.value}</div>
          </div>
        </div>
      </div>
    );
  }
}

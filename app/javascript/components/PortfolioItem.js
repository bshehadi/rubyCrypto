import React, { Component } from "react";

export default class PortfolioItem extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <div className="header">Currency: </div>
            <div className="text">{this.props.item.currency}</div>
          </div>
          <div className="col">
            <div className="header">Price bought at:</div>
            <div className="text">{(+this.props.item.priceBoughtAt).toFixed(2)}</div>
          </div>
          <div className="col">
            <div className="header">Amount you bought:</div>
            <div className="text">{this.props.item.rebalance}</div>
          </div>
          <div className="col">
            <div className="header">Current Value:</div>
            <div className="text">{(+this.props.item.priceBoughtAt * +this.props.item.rebalance).toFixed(2)}</div>
          </div>
          <div className="col">
            <div className="header">Date:</div>
            <div className="text">{new Date(this.props.item.date).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import PortfolioItem from "./PortfolioItem";

export default class Portfolio extends Component {
  render() {
    const portfolioItems = this.props.portfolio.map((item, index) => {
      return <PortfolioItem key={index} item={item} />;
    });
    const totalB = this.props.portfolio.reduce((totalB, curr) => {
      return totalB + +curr.priceBoughtAt * +curr.rebalance;
    }, 0);
    let total = 0;
    for (const key in this.props.currencyBalance) {
      const element = this.props.currencyBalance[key];
      total += element;
    }
    return (
      <div className="container-fluid">
        <div className="portfolio-value">
          <div className="portfolio-value--header">
            Your Portfolio value bought at is:{" "}
          </div>
          <div className="portfolio-value--content">{totalB.toFixed(2)}</div>
          <div className="portfolio-value--header">
            Your Portfolio value is:{" "}
          </div>
          <div className="portfolio-value--content">{total.toFixed(2)}</div>
          <div className="portfolio-value--header">Your profit is: </div>
          <div className="portfolio-value--content">
            {(total - totalB).toFixed(2)}
          </div>
        </div>
        <div className="portfolio-items">{portfolioItems}</div>
      </div>
    );
  }
}

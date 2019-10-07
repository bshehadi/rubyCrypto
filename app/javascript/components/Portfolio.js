import React, { Component } from "react";
import PortfolioItem from "./PortfolioItem";

export default class Portfolio extends Component {
  render() {
    const portfolioItems = this.props.portfolio.map((item, index) => {
      return <PortfolioItem key={index} item={item} />;
    });
    const total = this.props.portfolio.reduce((total, curr) => {
      return total  + +curr.priceBoughtAt * +curr.rebalance
    }, 0);
    return (
      <div className="container-fluid">
        <div className="portfolio-value">
          <div className="portfolio-value--header">
            Your Portfolio value is:{" "}
          </div>
          <div className="portfolio-value--content">{total.toFixed(2)}</div>
        </div>
        <div className="portfolio-items">{portfolioItems}</div>
      </div>
    );
  }
}

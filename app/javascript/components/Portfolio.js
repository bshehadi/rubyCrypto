import React, { Component } from "react";
import PortfolioItem from "./PortfolioItem";

export default class Portfolio extends Component {
  render() {
    return (
      <div>
        <div className="portfolio-value">
          <div className="portfolio-value--header">
            Your Portfolio value is:{" "}
          </div>
          <div className="portfolio-value--content">TOTAL</div>
        </div>
        <div className="portfolio-items"></div>
      </div>
    );
  }
}

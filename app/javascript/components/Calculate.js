import React, { Component } from "react";

export default class Calculate extends Component {
  render() {
    return (
      <div>
        <h1>How much {this.props.active_currency.name} do you own?</h1>
        <form onSubmit={this.props.handleSubmit}>
          <div className="form-group">
            <label>Enter amount owned</label>
            <br />
            <input
              type="text"
              autoComplete="off"
              name="amount"
              placeholder="How much do you own?"
              value={this.props.amount}
              className="field"
              onChange={this.props.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="calculate-btn"
              value="Calculate My Total"
            />
          </div>
        </form>
      </div>
    );
  }
}

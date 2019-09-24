import React, { Component } from "react";

export default class Search extends Component {
  render() {
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
      </div>
    );
  }
}

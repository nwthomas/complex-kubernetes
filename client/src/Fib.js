import React, { Component } from "react";

import axios from "axios";

class Fib extends Component {
  state = {
    seenIndices: [],
    values: {},
    index: "",
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndices();
  }

  async fetchValues() {
    try {
      const values = await axios.get("/api/values/current");
      this.setState({ values: values.data });
    } catch {
      // Noop
    }
  }

  async fetchIndices() {
    try {
      const indices = await axios.get("/api/values/all");
      this.setState({ seenIndices: indices.data });
    } catch {
      // Noop
    }
  }

  renderSeenIndices() {
    return this.state.seenIndices.map(({ number }) => number).join(", ");
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          {`For index ${key} I calculated ${this.state.values[key]}`}
        </div>
      );
    }

    return entries;
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("/api/values", {
        index: this.state.index,
      });

      this.setState({ index: "" });
    } catch {
      // Noop
    }
  };

  handleChange(event) {
    this.setState({ index: event.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input onChange={this.handleChange} value={this.state.index} />
          <button>Submit</button>
        </form>
        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndices()}
        <h3>Calculated Values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;

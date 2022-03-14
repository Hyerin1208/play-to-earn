import React, { Component } from "react";
import "./2048Game.css";
import NumberCell from "./NumberCell";

class NumberRow extends Component {
  render() {
    const numberRow = this.props.numberRow;
    const numberRowContent = numberRow.map((number, index) => (
      <NumberCell key={index} number={number} />
    ));
    return <div className="number-row">{numberRowContent}</div>;
  }
}

export default NumberRow;

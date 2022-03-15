import React, {Component} from "react";
import "./2048Game.css";
import NumberRow from "./NumberRow";

class NumberTable extends Component {
    render() {
        const numbers = this.props.numbers;
        const numberTableContent = numbers.map((numberRow) =>
            <NumberRow key={numberRow.id} numberRow={numberRow}/>
        );
        return (
            <div className="number-table">{numberTableContent}</div>
        );
    }
}

export default NumberTable;
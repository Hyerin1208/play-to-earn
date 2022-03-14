import React, {Component} from "react";
import "./2048Game.css";

class NumberCell extends Component {
    render() {
        let className = "number-cell num-";
        if (this.props.number !== "") {
            className += this.props.number[0];
            if (this.props.number[1] === "new") {
                className += " num-new";
            } else if (this.props.number[1] === "merged") {
                className += " num-merged";
            }
        } else {
            className += "null";
        }
        return (
            <div className={className}>{this.props.number[0]}</div>
        );
    }
}

export default NumberCell;

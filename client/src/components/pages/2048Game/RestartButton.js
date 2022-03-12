import React, {Component} from "react";
import "./2048Game.css";
import replay from "./replay.svg";

class RestartButton extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.props.restart();
        e.preventDefault();
    }

    render() {
        return (
            <button onClick={this.onClick} onTouchEnd={this.onClick}>
                <img src={replay} alt="replay" />
            </button>
        );
    }
}

export default RestartButton;
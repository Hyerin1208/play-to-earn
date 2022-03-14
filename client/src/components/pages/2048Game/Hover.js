import React, {Component} from "react";
import RestartButton from "./RestartButton";
import "./2048Game.css";

class Hover extends Component {
    render() {
        return (
            <div className={this.props.alive? "alive": "dead"}>
                <div id="game-over"><div>GAME OVER</div></div>
                <div id="restart"><RestartButton restart={this.props.restart}/></div>
            </div>
        );
    }
}

export default Hover;
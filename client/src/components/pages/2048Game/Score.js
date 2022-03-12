import React, {Component} from "react";
import "./2048Game.css";

class Score extends Component {
    render() {
        return (
            <div>
                <div class="score-board" id={this.props.info === "SCORE" ? "score-current": "score-best"}>
                    <div class="score-info"><div>{this.props.info}</div></div>
                    <div class="score-value"><div>{this.props.score}</div></div>
                </div>
            </div>
        );
    }
}

export default Score;

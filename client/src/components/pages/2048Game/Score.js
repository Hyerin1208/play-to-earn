import React, {Component} from "react";
import "./2048Game.css";

class Score extends Component {
    render() {
        return (
            <div>
                <div className="score-board" id={this.props.info === "SCORE" ? "score-current": "score-best"}>
                    <div className="score-info"><div>{this.props.info}</div></div>
                    <div className="score-value"><div>{this.props.score}</div></div>
                </div>
            </div>
        );
    }
}

export default Score;

import React, { Component } from "react";
import "./2048Game.css";
import Grid from "./Grid";
import NumberTable from "./NumberTable";
import Score from "./Score";
import Hover from "./Hover";

class Puzzle extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      grid: new Grid(),
      best: 0,
      beginX: 0,
      beginY: 0,
      endX: 0,
      endY: 0,
      enableSwipe: false,
    };
  }

  static getPosDuringEvent(e) {
    let X, Y;
    if (e.touches) {
      X = e.touches[0].screenX;
      Y = e.touches[0].screenY;
    } else {
      X = e.screenX;
      Y = e.screenY;
    }
    return [X, Y];
  }

  // 컴포넌트가 생성되고 render 호출 후, 최초 한번
  componentDidMount() {
    let events = {
      keydown: this.onKeyPressed,
      touchstart: this.onTouchStart,
      mousedown: this.onTouchStart,
      touchmove: this.onTouchMove,
      touchend: this.onTouchEnd,
      mousemove: this.onTouchMove,
      mouseup: this.onTouchEnd,
      gesturestart: this.onGestureStart,
    };

    this._isMounted = true;

    for (let e in events) {
      document.addEventListener(e, events[e].bind(this));
      break;
    }
  }

  onKeyPressed(e) {
    let legalKey = false;
    let grid = this.state.grid;
    const actionMap = { 37: "left", 38: "up", 39: "right", 40: "down" };
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      let action = actionMap[e.keyCode];
      legalKey = grid.action(action);
    }
    if (legalKey) {
      grid.addValue();
    }
    this.setState({ grid: grid });
    this.updateBest();
    e.preventDefault();
  }

  onTouchStart(e) {
    let [X, Y] = Puzzle.getPosDuringEvent(e);
    this.setState({
      beginX: X,
      beginY: Y,
      endX: X,
      endY: Y,
      enableSwipe: true,
    });
    e.preventDefault();
  }

  onTouchMove(e) {
    let [X, Y] = Puzzle.getPosDuringEvent(e);
    this.setState({ endX: X, endY: Y });
    e.preventDefault();
  }

  onTouchEnd(e) {
    let grid = this.state.grid;
    let [beginX, beginY] = [this.state.beginX, this.state.beginY];
    let [endX, endY] = [this.state.endX, this.state.endY];
    if (
      Math.pow(endX - beginX, 2) + Math.pow(endY - beginY, 2) > 10 &&
      this.state.enableSwipe
    ) {
      let action = "";
      if (Math.abs(beginX - endX) > Math.abs(beginY - endY)) {
        action = beginX < endX ? "right" : "left";
      } else {
        action = beginY < endY ? "down" : "up";
      }
      if (grid.action(action)) {
        grid.addValue();
      }
    }
    this.setState({ grid: grid, enableSwipe: false });
    this.updateBest();
    e.preventDefault();
  }

  onGestureStart(e) {
    this.setState({ enableSwipe: false });
    e.preventDefault();
  }

  restart() {
    this.setState({ grid: new Grid() });
  }

  updateBest() {
    if (this.state.grid.score > this.state.best) {
      this.setState({ best: this.state.grid.score });
    }
  }

  render() {
    return (
      <div>
        <div id={"score-group"}>
          <Score info={"SCORE"} score={this.state.grid.score} />
          <Score info={"BEST"} score={this.state.best} />
        </div>
        <NumberTable numbers={this.state.grid.numbers} />
        <Hover
          alive={this.state.grid.alive()}
          restart={this.restart.bind(this)}
        />
      </div>
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
}

export default Puzzle;

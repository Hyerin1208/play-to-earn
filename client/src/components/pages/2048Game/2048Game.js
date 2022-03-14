import React, { Component, useState } from "react";
import "./2048Game.css";
import Grid from "./Grid";
import NumberTable from "./NumberTable";
import Score from "./Score";
import Hover from "./Hover";

function Puzzle(props) {
  //   constructor(props) {
  //     super(props);
  //     state = {
  //       grid: new Grid(),
  //       best: 0,
  //       beginX: 0,
  //       beginY: 0,
  //       endX: 0,
  //       endY: 0,
  //       enableSwipe: false,
  //     };
  //   }

  const [gird, setGrid] = useState(Grid());
  const [best, setBset] = useState(0);
  const [beginX, setBeginX] = useState(0);
  const [beginY, setBeginY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [enableSwipe, setEnableSwipe] = useState(false);

  const getPosDuringEvent = (e) => {
    let X, Y;
    if (e.touches) {
      X = e.touches[0].screenX;
      Y = e.touches[0].screenY;
    } else {
      X = e.screenX;
      Y = e.screenY;
    }
    return [X, Y];
  };

  const componentDidMount = () => {
    let events = {
      keydown: onKeyPressed(),
      touchstart: onTouchStart(),
      mousedown: onTouchStart(),
      touchmove: onTouchMove(),
      touchend: onTouchEnd(),
      mousemove: onTouchMove(),
      mouseup: onTouchEnd(),
      gesturestart: onGestureStart(),
    };

    for (let e in events) {
      document.addEventListener(e, events[e]);
    }
  };

  const onKeyPressed = (e) => {
    let legalKey = false;
    let grid = state.grid;
    const actionMap = { 37: "left", 38: "up", 39: "right", 40: "down" };
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      let action = actionMap[e.keyCode];
      legalKey = grid.action(action);
    }
    if (legalKey) {
      grid.addValue();
    }
    useState({ grid: grid });
    updateBest();
    e.preventDefault();
  };

  const onTouchStart = (e) => {
    let [X, Y] = Puzzle.getPosDuringEvent(e);
    useState({
      beginX: X,
      beginY: Y,
      endX: X,
      endY: Y,
      enableSwipe: true,
    });
    e.preventDefault();
  };

  const onTouchMove = (e) => {
    let [X, Y] = Puzzle.getPosDuringEvent(e);
    setState({ endX: X, endY: Y });
    e.preventDefault();
  };

  const onTouchEnd = (e) => {
    let grid = state.grid;
    let [beginX, beginY] = [state.beginX, state.beginY];
    let [endX, endY] = [state.endX, state.endY];
    if (
      Math.pow(endX - beginX, 2) + Math.pow(endY - beginY, 2) > 10 &&
      state.enableSwipe
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
    setState({ grid: grid, enableSwipe: false });
    updateBest();
    e.preventDefault();
  };

  const onGestureStart = (e) => {
    setState({ enableSwipe: false });
    e.preventDefault();
  };

  const restart = () => {
    setState({ grid: new Grid() });
  };

  const updateBest = () => {
    if (state.grid.score > state.best) {
      setState({ best: state.grid.score });
    }
  };

  return (
    <div>
      <div id={"score-group"}>
        <Score info={"SCORE"} score={state.grid.score} />
        <Score info={"BEST"} score={state.best} />
      </div>
      <NumberTable numbers={state.grid.numbers} />
      <Hover alive={state.grid.alive()} restart={restart} />
    </div>
  );
}

export default Puzzle;

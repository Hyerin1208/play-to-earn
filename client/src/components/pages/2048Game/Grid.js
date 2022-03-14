import { Component } from "react";
import "./2048Game.css";
import * as Transpose from "./Transpose";

class Grid extends Component {
  constructor(props) {
    super(props);
    let numbers = new Array(4);
    for (let i = 0; i < 4; ++i) {
      numbers[i] = new Array(4);
      for (let j = 0; j < 4; ++j) {
        numbers[i][j] = "";
      }
    }
    this.numbers = numbers;
    this.score = 0;
    for (let i = 0; i < 2; ++i) {
      this.addValue();
    }
  }

  static getRandom() {
    let row = Math.floor(Math.random() * 4);
    let col = Math.floor(Math.random() * 4);
    return [row, col];
  }

  addValue() {
    let found = false;
    while (!found) {
      let [row, col] = Grid.getRandom();
      if (this.numbers[row][col] === "") {
        this.numbers[row][col] = [Math.random() > 0.5 ? 4 : 2, "new"];
        found = true;
      }
    }
  }

  move(rowNum) {
    let isMoved = false;
    let nextj = 0;
    for (let j = 0; j < 3; j = nextj) {
      nextj = j + 1;
      if (this.numbers[rowNum][j] !== "") {
        continue;
      }
      for (let k = j; k < 3; ++k) {
        this.numbers[rowNum][k] = this.numbers[rowNum][k + 1];
        if (this.numbers[rowNum][k]) {
          isMoved = true;
          nextj = j;
        }
      }
      this.numbers[rowNum][3] = "";
    }
    return isMoved;
  }

  merge(rowNum) {
    let isMerged = false;
    for (let j = 0; j <= 2; ++j) {
      if (
        this.numbers[rowNum][j] !== "" &&
        this.numbers[rowNum][j + 1] !== "" &&
        this.numbers[rowNum][j][0] === this.numbers[rowNum][j + 1][0]
      ) {
        this.numbers[rowNum][j][0] *= 2;
        this.numbers[rowNum][j][1] = "merged";
        this.numbers[rowNum][j + 1] = "";
        isMerged = true;
        this.score += this.numbers[rowNum][j][0];
      }
    }
    return isMerged;
  }

  leftMoveAndMerge() {
    let isChanged = false;
    for (let i = 0; i < 4; ++i) {
      let action1 = this.move(i);
      let action2 = this.merge(i);
      let action3 = this.move(i);
      isChanged = isChanged || action1 || action2 || action3;
    }
    return isChanged;
  }

  resetIsNew() {
    this.numbers.map((numberRow) => {
      return numberRow.map((number) => {
        if (number !== "") {
          number[1] = "none";
        }
        return number;
      });
    });
  }

  transpose(direction, reset) {
    switch (direction) {
      case "up":
        this.numbers = Transpose.upLeftTranspose(this.numbers);
        break;
      case "down":
        if (reset) {
          this.numbers = Transpose.upLeftTranspose(this.numbers);
          this.numbers = Transpose.upDownTranspose(this.numbers);
        } else {
          this.numbers = Transpose.upDownTranspose(this.numbers);
          this.numbers = Transpose.upLeftTranspose(this.numbers);
        }
        break;
      case "right":
        this.numbers = Transpose.leftRightTranspose(this.numbers);
        break;
      default:
        break;
    }
  }

  action(direction) {
    this.resetIsNew();
    this.transpose(direction, false);
    let isChanged = this.leftMoveAndMerge();
    this.transpose(direction, true);
    return isChanged;
  }

  alive() {
    for (let i = 0; i < 4; ++i) {
      for (let j = 0; j < 4; ++j) {
        if (this.numbers[i][j] === "") {
          return true;
        }
        if (
          i < 3 &&
          this.numbers[i + 1][j] !== "" &&
          this.numbers[i][j][0] === this.numbers[i + 1][j][0]
        ) {
          return true;
        }
        if (
          j < 3 &&
          this.numbers[i][j + 1] !== "" &&
          this.numbers[i][j][0] === this.numbers[i][j + 1][0]
        ) {
          return true;
        }
      }
    }
    return false;
  }

  render() {
    return null;
  }
}

export default Grid;

import React from "react";
import "./GameOver.css";
import axios from 'axios';

function GameOver(props) {
  const sendPoint = async () => {
    console.log(props.score);
    await axios.post(`http://localhost:5000/sendPoint`).then((res) => {
      console.log(res.data);
      alert("점수 등록 완료");
    });
  };
  return (
    <div
      id="GameBoard"
      style={{
        width: props.width,
        height: props.height,
        borderWidth: props.width / 50,
      }}
    >
      <div id="GameOver" style={{ fontSize: props.width / 15 }}>
        <div id="GameOverText">GAME OVER</div>
        <div id="color">Your score: {props.score}</div>
        <div id="color">
          {props.newHighScore ? "New local " : "Local "}high score:{" "}
          {props.highScore}
        </div>
        <div id="PressSpaceText">Press Space to restart</div>
        <div id="color" type="button" onClick={sendPoint}>
          점수 등록
        </div>
      </div>
    </div>
  );
}

export default GameOver;

import { Button } from "./Button";
import { GameHeaderStyle } from "./styles/GameHeaderStyle";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ReactLoaing from "react-loading";

export const GameHeader = ({ score, handleReset, highScore, setPopup }) => {
  const [Loading, setLoading] = useState(true);
  const account = useSelector((state) => state.AppState.account);
  const [prevScore, setPrevScore] = useState();

  useEffect(async () => {
    const puzzleData = await axios.post(
      `http://localhost:5000/game/puzzleScore`,
      { account: account }
    );
    if (puzzleData.data.puzzlePoint !== null) {
      setPrevScore(puzzleData.data.puzzlePoint);
    }
    setLoading(false);
  }, [account]);

  if (Loading) {
    return (
      <div>
        잠시만 기다려 주세요
        <ReactLoaing type={"bars"} color={"purple"} height={375} width={375} />
      </div>
    );
  } else {
    return (
      <GameHeaderStyle>
        <div className="game-header">
          <h1 className="title">
            <span className="tile2">2</span>
            <span className="tile0">0</span>
            <span className="tile4">4</span>
            <span className="tile8">8</span>
          </h1>
          <div className="scoreContainer">
            <div className="score">
              <p>Score</p>
              <h1>{score}</h1>
            </div>
            <div className="score">
              <p>Prev Score</p>
              <h1>{prevScore === undefined ? "None" : prevScore}</h1>
            </div>
          </div>
        </div>

        <div className="buttons">
          <p onClick={() => setPopup(true)}>How to play</p>
          <Button onClick={handleReset} />
        </div>
      </GameHeaderStyle>
    );
  }
};

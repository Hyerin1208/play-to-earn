import { Button } from "./Button";
import { GameHeaderStyle } from "./styles/GameHeaderStyle";

export const GameHeader = ({ score, handleReset, highScore, setPopup }) => {
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
     {/* <div className="score">
      <p>High Score</p>
      <h1>{highScore <= score ? score : highScore}</h1>
     </div> */}
    </div>
   </div>

   <div className="buttons">
    <p onClick={() => setPopup(true)}>How to play</p>
    <Button onClick={handleReset} />
   </div>
  </GameHeaderStyle>
 );
};

import React, { useEffect } from "react";
import "./Game.css";

function Game() {
  useEffect(() => {
    // Create script
    let script = document.createElement("script");
    script.src = `${process.env.PUBLIC_URL}/game.js`;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="container">
      <div id="game"></div>
      <div id="score">0</div>
      <div id="instructions">
        Click (or press the spacebar) to place the block
      </div>
      <div class="game-over">
        <h2>Game Over</h2>
        <p>You did great, you're the best.</p>
        <p>Click or spacebar to start again</p>
      </div>
      <div class="game-ready">
        <div id="start-button">Start</div>
        <div></div>
      </div>
    </div>
  );
}

export default Game;

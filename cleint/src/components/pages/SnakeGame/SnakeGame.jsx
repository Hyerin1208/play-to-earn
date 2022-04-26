import React, { useState, useEffect } from "react";
import Board from "./Board/Board";
import "./SnakeGame.css";

function SnakeGame({ setShowModal }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;

    setLoading(false);
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <div className="game_modal__wrapper">
      <div className="game_single__modal">
        <span className="game_close__modal">
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <div id="snake_board_container" className="snake_game">
          <Board />
        </div>
      </div>
    </div>
  );
}

export default SnakeGame;

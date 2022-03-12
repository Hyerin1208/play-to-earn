import React, { Fragment } from "react";
import { Link, Routes, Route } from "react-router-dom";
import SnakeGames from "../pages/SnakeGame/SnakeGame";
import TetrisGames from "../pages/TetrisGame/Tetris.js";
import TzfeGames from "../pages/2048Game/App"
import "./Game.css";

function Game() {
  return (
    <div className="Gamebox">
      <h1>게임모음집</h1>
      <ul>
        <li>
          <Link to="SnakeGames">스네이크</Link>
        </li>
        <li>
          <Link to="TetrisGames">테트리스</Link>
        </li>
        <li>
          <Link to="TzfeGames">2048</Link>
        </li>
      </ul>
      <Routes>
        <Route path="SnakeGames" element={<SnakeGames />} />
        <Route path="TetrisGames" element={<TetrisGames />} />
        <Route path="TzfeGames" element={<TzfeGames />} />
      </Routes>
    </div>
  );
}

export default Game;

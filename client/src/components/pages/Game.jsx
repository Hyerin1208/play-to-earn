import React, { useEffect } from "react";
import "./Game.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  BrowserRouter,
} from "react-router-dom";
import SnakeGame from "../pages/SnakeGame/SnakeGame";

function Game() {
  // useEffect(() => {
  //   // Create script
  //   let script = document.createElement("script");
  //   script.src = `${process.env.PUBLIC_URL}/game.js`;
  //   script.async = true;
  //   document.body.appendChild(script);
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);
  // 아 라우트 너무 어렵다... 일단 게임이나 찾아서 올려야겠다....

  return (
    <div>
      <Link to="./SnakeGame/SnakeGame/SankeGame">
        <button> 이동하기 </button>
      </Link>
    </div>
  );
}

export default Game;

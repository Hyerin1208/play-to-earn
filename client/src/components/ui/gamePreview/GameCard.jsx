import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { Col } from "reactstrap";
// import SnakeGame from "../../pages/SnakeGame/SnakeGame";
// import TetrisGame from "../../pages/TetrisGame/Tetris";
// import PuzzleGame from "../../pages/2048Game/2048Game";
// import MineGame from "../../pages/MineGame/MineGame";

import "./game-card.css";

const GameCard = (props) => {
  const { id, title, imgUrl, text } = props.item;
  console.log(props);
  return (
    <>
      <div className="gameCard__wrapper">
        <div className="gamecard__img">
          <img src={imgUrl} alt="" />
        </div>

        <div className="card__body">
          <Col lg="12" md="3" sm="6">
            <div className="single__game__card">
              <h3 className="gameCard__title">{title}</h3>
              <p className="gameCard__text">{text}</p>

              <button className="gamecard__btn">
                <Link to={id}>Go to this game</Link>
                {/* <Link onClick={() => Navigate("id")}>Go to this game</Link> */}
              </button>
            </div>
          </Col>
        </div>
      </div>
    </>
  );
};

export default GameCard;

import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Col } from "reactstrap";
import SnakeGame from "../../pages/SnakeGame/SnakeGame";
import TetrisGame from "../../pages/TetrisGame/Tetris";
import PuzzleGame from "../../pages/2048Game/2048Game";
import MineGame from "../../pages/MineGame/MineGame";

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
          <Col lg="3" md="4" sm="6">
            <div className="single__game__card">
              <h3 className="gameCard__title">{title}</h3>
              <p className="gameCard__text text-secondary">{text}</p>
              <a className="btn btn-outline-secondary">
                <Link to={id}>Go to this game</Link>
              </a>
            </div>
          </Col>
        </div>
        <Routes>
          <Route path="1" element={<SnakeGame />} />
          <Route path="2" element={<TetrisGame />} />
          <Route path="3" element={<PuzzleGame />} />
          <Route path="4" element={<MineGame />} />
        </Routes>
      </div>
    </>
  );
};

export default GameCard;

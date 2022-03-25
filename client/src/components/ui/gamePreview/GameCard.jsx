import React, { useState } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { Col } from "reactstrap";
import SnakeGame from "../../pages/SnakeGame/SnakeGame";
import TetrisGame from "../../pages/TetrisGame/Tetris";
import PuzzleGame from "../../pages/2048Game/2048Game";
import MineGame from "../../pages/MineGame/MineGame";

import "./game-card.css";

const GameCard = (props) => {
  const { id, title, imgUrl, text } = props.item;
  const [showModal, setShowModal] = useState(false);
  function test(showModal) {
    if (showModal) {
      switch (id) {
        case "1":
          return <SnakeGame setShowModal={setShowModal}></SnakeGame>;
        case "2":
          return <TetrisGame setShowModal={setShowModal}></TetrisGame>;
        case "3":
          return <PuzzleGame setShowModal={setShowModal}></PuzzleGame>;
        case "4":
          return <MineGame setShowModal={setShowModal}></MineGame>;

        default:
          console.log("디폴트");
          break;
      }
    } else {
      console.log("아직안열림ㄴ");
    }
  }
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

              <button
                className="gamecard__btn"
                onClick={() => setShowModal(true)}
              >
                gkgkgkgkggk
                {/* <Link to={id}>Go to this game</Link> */}
                {/* <Link onClick={() => Navigate("id")}>Go to this game</Link> */}
              </button>
              {test(showModal)}
            </div>
          </Col>
        </div>
      </div>
    </>
  );
};

export default GameCard;

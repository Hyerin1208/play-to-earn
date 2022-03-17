import React, { Fragment, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

import "./game.css";
import CommonSection from "../ui/CommonSection";
import Ranking from "./Ranking";
import Compensation from "./Compensation";
import GameCard from "../ui/gamePreview/GameCard";

import { GAMECARD__DATA } from "../../assets/data/gamecard";
import SnakeGame from "../pages/SnakeGame/SnakeGame";
import TetrisGame from "../pages/TetrisGame/Tetris";
import PuzzleGame from "../pages/2048Game/2048Game";
import MineGame from "../pages/MineGame/MineGame";

function Game() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <CommonSection title="GAME'S FEATURES" />
      <Container>
        <Row>
          <Col xs="6">
            <div className="game__infoBox">
              <button className="ranking__btn">
                <Link to="/ranking">
                  <i className="ri-trophy-line"></i>
                  Ranking
                </Link>
              </button>
            </div>
          </Col>
          <Col xs="6">
            <div className="game__infoBox">
              <button
                className="compensation__btn"
                onClick={() => setShowModal(true)}
              >
                <span>Weekly Reward</span>
              </button>

              {showModal && <Compensation setShowModal={setShowModal} />}
            </div>
          </Col>
        </Row>
        <Row>
          {/* <Col lg="12" className="mb-5">
          <div className="live__list__top">
            <h3>Play Now</h3>
          </div>
        </Col> */}

          {GAMECARD__DATA.slice(0, 4).map((item, index) => (
            <Col lg="3" md="4" sm="6" key={index} className="mb-4">
              <GameCard key={item.id} item={item} />
            </Col>
          ))}
        </Row>
        <Routes>
          <Route path="1" element={<SnakeGame />} />
          <Route path="2" element={<TetrisGame />} />
          <Route path="3" element={<PuzzleGame />} />
          <Route path="4" element={<MineGame />} />
        </Routes>
      </Container>
    </Fragment>
  );
}

export default Game;

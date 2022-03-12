import React, { Fragment, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import SnakeGames from "../pages/SnakeGame/SnakeGame";
import TetrisGames from "../pages/TetrisGame/Tetris.js";
import CommonSection from "../ui/CommonSection";
import Ranking from "./Ranking";

import "./game.css";
import Compensation from "./Compensation";

function Game() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <CommonSection title="GAME'S FEATURES" />
      <Container>
        <Row>
          <Col>
            <div className="game__infoBox">
              <button className="ranking__btn">
                <Link to="/ranking">랭킹 확인</Link>
              </button>

              <button
                className="Compensation__btn"
                onClick={() => setShowModal(true)}
              >
                랭킹별 보상리스트
              </button>

              {showModal && <Compensation setShowModal={setShowModal} />}
            </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <div className="single__game__card">
              <Link to="SnakeGames">스네이크</Link>
            </div>
            <div className="single__game__card">
              <Link to="TetrisGames">테트리스</Link>
            </div>
          </Col>
        </Row>
        <Routes>
          <Route path="SnakeGames" element={<SnakeGames />} />
          <Route path="TetrisGames" element={<TetrisGames />} />
          <Route path="Ranking" element={<Ranking />} />
          <Route path="Compensation" element={<Compensation />} />
        </Routes>
      </Container>
    </Fragment>
  );
}

export default Game;

import React, { Fragment } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import SnakeGames from "../pages/SnakeGame/SnakeGame";
import TetrisGames from "../pages/TetrisGame/Tetris.js";
import CommonSection from "../ui/CommonSection";

import Ranking from "./Ranking";

function Game() {
  return (
    <>
      <CommonSection title="GAME'S FEATURES" />
      <Container>
        <button className="ranking__btn">
          <Link to="/ranking">Ranking</Link>
        </button>
        <Row>
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
        </Routes>
      </Container>
    </>
  );
}

export default Game;

import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./main-section.css";

import mainImg from "../../assets/images/Medusa.png";

const MainSection = () => {
  return (
    <div className="main__section">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="main__content">
              <h2>
                Discover rare digital art and collect
                <span>sell extraordinary</span>NFTs
              </h2>
              <p>
                The Marketplace- an extremely bustling place - a place for
                players to exchange and trade the items they own.
              </p>
              <div className="main__btns">
                <button className="join__btn">
                  <i className="ri-registered-line"></i>
                  <Link to="/market"> Join Us</Link>
                </button>
                <button className="join__btn">
                  <i className="ri-gamepad-line"></i>
                  <Link to="/game"> Play Game</Link>
                </button>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="main__img">
              <img src={mainImg} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainSection;

import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./main-section.css";

const MainSection = () => {
  return (
    <section className="main__section">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="main__content">
              <h2>
                Discover rare digital art and collect
                <span> sell extraordinary</span> NFTs
              </h2>
              <p>
                The Marketplace- an extremely bustling place - a place for
                players to exchange and trade the items they own.
              </p>
              <div className="main__btns d-flex align-items-center gap-4">
                <button className="join__btn d-flex align-items-center gap-2">
                  <i className="ri-registered-line"></i>
                  <Link to="/market">회원가입</Link>
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MainSection;

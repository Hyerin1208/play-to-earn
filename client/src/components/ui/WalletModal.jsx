import React from "react";

import "./walletmodal.css";

import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import { WALLET__DATA } from "../../assets/data/wallet";

const WalletModal = ({ setShowModal }) => {
  return (
    <div className="modal__wrapper">
      <div className="wallet__modal">
        <Col lg="12" className="mb-3">
          <span className="close__modal">
            <i
              className="ri-close-line"
              onClick={() => setShowModal(false)}
            ></i>
          </span>
          <h3 className="wallet__title">Connect to a wallet</h3>
          <Container className="wallet__container">
            <Row>
              {WALLET__DATA.map((item) => (
                <Col
                  lg="3"
                  md="2"
                  sm="3"
                  className="wallet__layout"
                  key={item.id}
                >
                  <div className="single__wallet__box">
                    <img
                      className="wallet__img"
                      src={item.icon}
                      alt=""
                      width="50px"
                    />

                    <div className="wallet___name">
                      <p>{item.title}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </Col>
      </div>
    </div>
  );
};

export default WalletModal;

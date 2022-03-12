import React from "react";

import "./walletmodal.css";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import { WALLET__DATA } from "../../assets/data/wallet";

const WalletModal = ({ setShowModal }) => {
  return (
    <div className="modal__wrapper">
      <div className="wallet__modal">
        <span className="close__modal">
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h3 className="wallet__title">Connect to a wallet</h3>
        <Container>
          {WALLET__DATA.map((item) => (
            <Row key={item.id}>
              <Col lg="12" className="mb-5">
                <div className="single__wallet__box">
                  <img
                    className="wallet__img"
                    src={item.icon}
                    alt=""
                    width="40px"
                  />

                  <div className="wallet___name">
                    <p>{item.title}</p>
                  </div>
                </div>
              </Col>
            </Row>
          ))}
        </Container>
      </div>
    </div>
  );
};

export default WalletModal;

import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "reactstrap";

import walletImg from "../../../assets/images/wallet.png";
import walletMeta from "../../../assets/images/account.png";

import "./create-account.css";

const createAccount = () => {
  return (
    <Fragment>
      <Container>
        <Row>
          <Col lg="8" className="mb-3">
            <div className="free__list__top">
              <h3>Create Account</h3>
              <h5>Connect to a wallet</h5>
              <Card.Img
                className="create__Account"
                variant="top"
                src={walletImg}
                style={{ backgroundColor: "black" }}
              />

              <button className="singleNfts-btn">
                <i className="ri-wallet-3-line"></i>
                <Link to="/wallet">Connect your wallet</Link>
              </button>
              <div className="account__desc">
                <p>Access to link and bind your wallet</p>
                <span>Use BNB to buy character</span>
              </div>
            </div>
          </Col>
          <Col lg="4">
            <Card.Img
              className="create__Account"
              variant="top"
              src={walletMeta}
              style={{ backgroundColor: "black", maxWidth: "300px" }}
            />
          </Col>
        </Row>
      </Container>

      <div className="btn__container">
        <Link to="/join/step2">Back</Link>
        <Link to="/join/step4">Next</Link>
      </div>
    </Fragment>
  );
};

export default createAccount;

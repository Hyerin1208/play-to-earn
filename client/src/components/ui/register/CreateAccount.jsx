import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "reactstrap";

import walletImg from "../../../assets/images/wallet.png";
import walletPack from "../../../assets/images/connect_wallet.PNG";

import "./create-account.css";

const createAccount = () => {
  return (
    <Fragment>
      <Container>
        <Row>
          <Col lg="12" className="mb-3">
            <div className="free__list__top">
              <h3>Create Account</h3>
              <h5>Connect to a wallet</h5>
              <Card
                border="light"
                style={{
                  width: "70rem",
                  height: "24rem",
                  backgroundColor: "black",
                }}
              >
                <Card.Header>
                  {" "}
                  <button className="singleNfts-btn">
                    <i className="ri-wallet-3-line"></i>
                    <Link to="/wallet">Connect your wallet</Link>
                  </button>
                </Card.Header>
                <Row>
                  <Col>
                    <Card.Img
                      className="create__Account"
                      variant="top"
                      src={walletImg}
                    />
                  </Col>
                  <Col>
                    <Card.Img
                      className="wallet__pack"
                      variant="top"
                      src={walletPack}
                      style={{
                        width: "390px",
                        height: "200px",
                        marginLeft: "15%",
                      }}
                    />
                  </Col>
                </Row>
                <Col>
                  <div className="account__desc">
                    <p>Access to link and bind your wallet</p>
                    <span>Use BNB to buy character</span>
                  </div>
                </Col>
              </Card>
            </div>
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

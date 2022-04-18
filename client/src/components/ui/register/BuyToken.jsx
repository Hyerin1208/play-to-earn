import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Button, Col, Container, Row } from "reactstrap";

import MetaMask from "../../../assets/images/metaMask.png";
import Binace from "../../../assets/images/binance.png";
import BinaceMeta2 from "../../../assets/images/BinanceMeta.PNG";
import "./buy-token.css";

const BuyToken = () => {
  return (
    <Fragment>
      <Container>
        <Row>
          <Col lg="12" className="mb-3">
            <div className="free__list__top">
              <h3>Create Wallet & Buy BNB</h3>
              <h5>How to transfer NFT</h5>
            </div>
          </Col>
          <Col lg="4">
            <div
              className="wallet__init"
              border="light"
              style={{
                maxWidth: "20rem",
                height: "24rem",
                backgroundColor: "black",
                marginBottom: "20px",
                display: "flex",
              }}
            >
              {/* <Card.Header>Install Wallet</Card.Header> */}
              <Card.Body>
                <Card.Title>Download & Setup</Card.Title>
                <div className="meta_hover">
                  <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">
                    <Card.Img
                      variant="top"
                      src={MetaMask}
                      className="meta__Img"
                    />
                  </a>
                </div>
                <Card.Text>Functions of Wallet</Card.Text>
                <span>
                  1.Store assets such as $BNB
                  <br />
                  2.Transfer assets between accounts
                  <br />
                  3.Purchase NFT
                </span>
              </Card.Body>
            </div>
          </Col>
          <Col lg="8">
            <div
              className="buy__init"
              border="light"
              style={{
                maxWidth: "100rem !important",
                height: "24rem",
                backgroundColor: "black",
                display: "flex",
              }}
            >
              <Card.Header>Buy BNB</Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Title>Step 1</Card.Title>
                    <Card.Text>Buy BNB on Binance</Card.Text>
                    <Card.Img
                      className="Binance__meta"
                      variant="top"
                      src={Binace}
                    />
                  </Col>
                  <Col>
                    <Card.Title>Step 2</Card.Title>
                    <Card.Text>
                      Transfer BNB Form Binance to you Wallet
                    </Card.Text>
                    <Button className="BuyBNB__Btn" outline color="warning">
                      <a href="https://testnet.binance.org/faucet-smart">
                        Binance
                      </a>
                    </Button>
                    <Card.Img
                      className="BinanceMeta2"
                      variant="top"
                      src={BinaceMeta2}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="btn__container">
        <Link to="/join/step1">Back</Link>
        <Link to="/join/step3">Next</Link>
      </div>
    </Fragment>
  );
};

export default BuyToken;

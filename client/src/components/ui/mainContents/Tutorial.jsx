import React from "react";

import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import "./tutorial.css";

const TUTORIAL__DATA = [
  {
    id: "1",
    title: "Setup your wallet",
    desc: "Wallet is your boarding pass to our digital nation. Coneect your wallet and then activate your tier.",
    icon: "ri-wallet-line",
  },
  {
    id: "2",
    title: "Buy NFTs on our market",
    desc: "Buy NFT from the Official Marketplace or Join the Discord Community to apply for a schlarship and start your Journey.",
    icon: "ri-store-2-line",
  },
  {
    id: "3",
    title: "Earn Money Passively or Actively",
    desc: "Top cryptocurrency games where you can get token gift in 2022.",
    icon: "ri-coins-line",
  },
  {
    id: "4",
    title: "Create your collection",
    desc: "Players can both sell NFT cards and tokens for real money.",
    icon: "ri-layout-masonry-line",
  },
];

const Tutorial = () => {
  return (
    <Container>
      <Row>
        <Col lg="12" className="mb-4">
          <h3 className="step__title">Battle. Collect. Earn.</h3>
        </Col>

        {TUTORIAL__DATA.map((item, index) => (
          <Col lg="3" md="4" sm="6" key={index} className="mb-4">
            <div className="single__step__item">
              <span>
                <i className={item.icon}></i>
              </span>
              <div className="step__item__content">
                <h5>
                  <Link to="/wallet">{item.title}</Link>
                </h5>
                <p className="mb-0">{item.desc}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Tutorial;

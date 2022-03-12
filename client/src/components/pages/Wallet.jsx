import React from "react";

import CommonSection from "../ui/CommonSection";
import { Container, Row, Col } from "reactstrap";

import "./wallet.css";

const wallet__data = [
  {
    id: 1,
    title: "MetaMask",
    desc: "Metamask is one of the most popular cryptocurrency wallets. If you need to swap currencies to buy an NFT, Metamask has a built-in swap feature. You can also limit how much you pay in gas fees. If you need to use a different blockchain, Metamask offers support for alternative platforms.",
    icon: "ri-money-cny-circle-line",
  },
  {
    id: 2,
    title: "Binance Chain Wallet",
    desc: "Binance Chain Wallet is the official Binance cryptocurrency wallet for accessing Binance Smart Chain, Binance Chain, and Ethereum. You can use it to securely store your crypto and connect to thousands of projects across different blockchains. ",
    icon: "ri-bit-coin-fill",
  },
  {
    id: 3,
    title: "Trust Wallet",
    desc: "Trust Wallet is a popular mobile-only wallet owned by Binance. While it supports multiple blockchains, including Ethereum, its association with Binance means that it's heavily biased toward smart chain tokens.",
    icon: "ri-coin-line",
  },
  {
    id: 4,
    title: "Coinbase Wallet",
    desc: "Many people know Coinbase for its cryptocurrency exchange. It also offers a non-custodial wallet suitable for holding NFTs and other tokens. Unlike holding cryptocurrency on Coinbase's exchange, holding assets in the Coinbase Wallet gives the user full control over their crypto.",
    icon: "ri-money-dollar-circle-line",
  },
];

const Wallet = () => {
  return (
    <>
      <CommonSection title="Get started with NFTs" />
      <div className="wallet__box">
        <Container>
          <Row>
            <Col lg="12" className="wallet__col">
              <h3 className="text-light">Connect your wallet</h3>
              <div className="wallet__content">
                <p>
                  One of the best ways to learn more about investing in NFTs is
                  to get started buying and selling them. Download and set up a
                  wallet, browse the top NFT marketplaces, transfer the
                  necessary currency to your new wallet, and make your first
                  purchase.
                </p>
              </div>
            </Col>
            {wallet__data.map((item, index) => (
              <Col lg="3" md="4" sm="6" key={item.id}>
                <div className="wallet__item">
                  <span>
                    <i className={item.icon}></i>
                  </span>
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Wallet;

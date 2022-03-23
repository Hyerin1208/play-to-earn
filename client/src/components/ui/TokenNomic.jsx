import React from "react";
import { Row, Container, Col } from "reactstrap";
import { PieChart, Pie, Tooltip } from "recharts";

import "./token-nomic.css";

const TokenNomic = () => {
  const data = [
    { name: "총 공급량", value: 2000 },
    { name: "개인 보유량", value: 500 },
  ];
  return (
    <div className="chart__container">
      <Container>
        <Row>
          <h2 className="chart__heading">작명소 TOKENOMICS</h2>
          <Col>
            <div className="square__box">
              <span></span>
              <span></span>
              <span></span>
              <div className="token__content">
                <h3>NFT PLAY TO EARN GAME</h3>
                <p>
                  You don't have to race to earn money if you don't want to, you
                  can also stake tokens and earn money while not participating
                  in the game, or become a trader of skins/items which hold
                  value in the NFT marketplace.
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </Col>
          <Col>
            <div className="chart-wrapper">
              <PieChart width={500} height={500}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={175}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TokenNomic;

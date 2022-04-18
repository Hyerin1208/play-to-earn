import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Container, Col } from "reactstrap";
import { PieChart, Pie, Tooltip } from "recharts";

import "./token-nomic.css";

const TokenNomic = () => {
  const [amount, setAmount] = useState(0);

  const Selllists = useSelector((state) => state.AppState.Selllists);

  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  async function getTokenAmount() {
    if (CreateNFTContract !== null) {
      const lists = await CreateNFTContract.methods.totalNFTs().call();
      setAmount(await lists);
    }
  }

  useEffect(() => {
    getTokenAmount();
  }, [amount]);

  const data = [
    { name: "총 발행량", value: parseInt(amount) }, // user + owner + default
    { name: "총 공급량", value: parseInt(Selllists.length) }, // market에 판매되고있는 수량
  ];

  //   var option = {
  //     maintainAspectRatio: false,
  //   };

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
                <a href="/wallet">Read More</a>
              </div>
            </div>
          </Col>
          <Col>
            <div className="chart-wrapper">
              <PieChart width={500} height={500}>
                <Pie
                  dataKey="value"
                  nameKey="name"
                  isAnimationActive={true}
                  data={data}
                  radius={100}
                  cx="50%"
                  cy="50%"
                  outerRadius={175}
                  fill="#8884d8"
                  label
                  //   options={options}
                />
                <Tooltip />
              </PieChart>
              {/* <button onClick={() => getTokenAmount()}>getAmount</button> */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TokenNomic;

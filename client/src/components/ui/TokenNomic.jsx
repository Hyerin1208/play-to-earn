import React from "react";
import { Row, Container } from "reactstrap";
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
          <div className="chart-wrapper">
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default TokenNomic;

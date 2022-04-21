import React, { useState } from "react";
import "./earning.css";

const Earnings = () => {
  const [token, setToken] = useState("00.00");
  return (
    <div className="earning__card">
      <div className="card__content">
        <div className="earning__chart">
          <i className="ri-copper-diamond-line"></i>
        </div>
        <div className="earing__text">
          <div className="token__mybox">{token} ETH</div>
          <div className="token__mydesc">Total Volume</div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;

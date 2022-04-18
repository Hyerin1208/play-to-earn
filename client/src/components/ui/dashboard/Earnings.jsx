import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./earning.css";
import axios from "axios";

const Earnings = () => {
  const Mybalance = useSelector((state) => state.AppState.Mybalance);
  return (
    <div className="earning__card">
      <div className="card__content">
        <div className="earning__chart">
          <i className="ri-copper-diamond-line"></i>
        </div>
        <div className="earing__text">
          <div className="token__mydesc">Total Volume</div>
          <div className="token__mybox">
            <p>{Mybalance}</p> AAT
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;

import React, { useState } from "react";

import "./my-ranking.css";
import Carousel from "react-elastic-carousel";
import { Card } from "reactstrap";

const MyRanking = () => {
  const [ranking, setRanking] = useState("7");

  return (
    <div className="myrank__card">
      <div className="carousel__box">
        <Carousel itemsToShow={1}>
          <div className="carousel__card" numbers="1">
            <div className="myrank__content">
              <div className="myrank__chart">
                <i className="ri-hand-coin-line"></i>
              </div>
              <div className="myrank__text">
                <div className="rank__mybox">
                  {ranking} 위<span>In top 0.342%</span>
                </div>
                <button className="get__token">Get My Token</button>
              </div>
            </div>
          </div>
          <div className="carousel__card" numbers="2"></div>
          <div className="carousel__card" numbers="3"></div>
          <div className="carousel__card" numbers="4"></div>
        </Carousel>
      </div>
    </div>
  );
};

export default MyRanking;

import React, { useState } from "react";
import Carousel from "react-elastic-carousel";

import "./admin-info.css";

const AdminInfo = () => {
  const [tokenAmount, setTokenAmount] = useState("");
  return (
    <div className="InfoA__card">
      <div className="carousel0__box">
        <Carousel itemsToShow={1}>
          <div className="carousel__card" numbers="1">
            <div className="card__content">
              <div className="InfoA__chart">
                <i className="ri-bar-chart-box-line"></i>
              </div>
              <div className="earing__text">
                <div className="token__mybox">{tokenAmount}token</div>
                <div className="token__mydesc">발행한 토큰수</div>
              </div>
            </div>
          </div>
          <div className="carousel__card" numbers="2">
            <div className="card__content">
              <div className="InfoA__chart">
                <i className="ri-bar-chart-2-line"></i>
              </div>
              <div className="earing__text">
                <div className="token__mybox">{tokenAmount}token</div>
                <div className="token__mydesc">미지급된 토큰양</div>
              </div>
            </div>
          </div>
          <div className="carousel__card" numbers="3">
            <div className="card__content">
              <div className="InfoA__chart">
                <i className="ri-line-chart-line"></i>
              </div>
              <div className="earing__text">
                <div className="token__mybox">{tokenAmount}token</div>
                <div className="token__mydesc">지급된 토큰양</div>
              </div>
            </div>
          </div>
          <div className="carousel__card" numbers="4">
            <div className="card__content">
              <div className="InfoA__chart">
                <i className="ri-pie-chart-box-line"></i>
              </div>
              <div className="token__mybox">nfts</div>
              <div className="token__mydesc">발행한 nfts 수</div>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default AdminInfo;

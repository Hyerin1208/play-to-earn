import React, { useState } from "react";
import Carousel from "react-elastic-carousel";

import "./accept.css";

const Accept = () => {
  return (
    <div className="admin__card">
      <div className="carousel__con">
        <Carousel itemsToShow={1}>
          <div className="winner__card" numbers="1">
            <div className="winner__content">
              <div className="winner__chart">{/* Snake */}</div>
              <div className="earing__text">
                <div className="token__mybox">Snake Game Winner</div>
                <div className="winner__box">
                  <ul>
                    <li>
                      <p></p>
                      <button className="accept__btn">signed</button>
                    </li>
                    <li>
                      <button className="accept__btn">signed</button>
                    </li>
                    <li>
                      <button className="accept__btn">signed</button>
                    </li>
                    <li>
                      <button className="accept__btn">signed</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="winner__card" numbers="2">
            <div className="winner__content">
              <div className="winner__chart">{/* Tetris */}</div>
              <div className="earing__text">
                <div className="token__mybox">Tetris Game Winner</div>
                <div className="winner__box">
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="winner__card" numbers="3">
            <div className="winner__content">
              <div className="winner_chart">{/* 2048 */}</div>
              <div className="earing__text">
                <div className="token__mybox">2048 Game Winner</div>
                <div className="winner__box">
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="winner__card" numbers="4">
            <div className="winner__content">
              <div className="winner__chart">{/* Minesweeper */}</div>
              <div className="earing__text">
                <div className="token__mybox">Minesweeper Game Winner</div>
                <div className="winner__box">
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Accept;

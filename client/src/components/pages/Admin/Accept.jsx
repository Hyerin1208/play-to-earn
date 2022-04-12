import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";

import "./accept.css";
const Accept = () => {
  const [rankingDB, setRankingDB] = useState(null);
  const account = useSelector((state) => state.AppState.account);
  const TokenContract = useSelector(
    (state) => state.AppState.AmusementArcadeTokenContract
  );
  const TokenClaimContract = useSelector(
    (state) => state.AppState.TokenClaimContract
  );
  useEffect(() => {
    if (account !== null) {
      axios
        .post(`http://localhost:5000/game/ranking`, { address: account })
        .then((response) => {
          const data = response.data;
          setRankingDB(data);
        });
    }
  }, [account]);

  async function setClaim(address, amount) {
    if (TokenClaimContract !== null) {
      await TokenClaimContract.methods
        .setClaim(address, amount)
        .send({ from: account, gas: 3000000 });
    } else {
      alert("컨트랙트 로드 실패");
    }
  }

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
                  <p>
                    {rankingDB !== null
                      ? rankingDB.snakeranker[0] !== undefined
                        ? rankingDB.snakeranker[0].address
                        : "순위없음"
                      : "순위없음"}
                  </p>
                  <button
                    className="accept__btn"
                    onClick={(e) => {
                      if (
                        rankingDB !== null &&
                        rankingDB.snakeranker[0] !== undefined
                      ) {
                        setClaim(rankingDB.snakeranker[0].address, 1000);
                        e.currentTarget.setAttribute("hidden", "true");
                      }
                    }}
                  >
                    signed
                  </button>
                </div>
                <div className="winner__box">
                  <p>
                    {rankingDB !== null
                      ? rankingDB.snakeranker[1] !== undefined
                        ? rankingDB.snakeranker[1].address
                        : "순위없음"
                      : "순위없음"}
                  </p>
                  <button
                    className="accept__btn"
                    onClick={(e) => {
                      if (
                        rankingDB !== null &&
                        rankingDB.snakeranker[1] !== undefined
                      ) {
                        setClaim(rankingDB.snakeranker[1].address, 600);
                        e.currentTarget.setAttribute("hidden", "true");
                      }
                    }}
                  >
                    signed
                  </button>
                </div>
                <div className="winner__box">
                  <p>
                    {rankingDB !== null
                      ? rankingDB.snakeranker[2] !== undefined
                        ? rankingDB.snakeranker[2].address
                        : "순위없음"
                      : "순위없음"}
                  </p>
                  <button
                    className="accept__btn"
                    onClick={(e) => {
                      if (
                        rankingDB !== null &&
                        rankingDB.snakeranker[2] !== undefined
                      ) {
                        setClaim(rankingDB.snakeranker[2].address, 400);
                        e.currentTarget.setAttribute("hidden", "true");
                      }
                    }}
                  >
                    signed
                  </button>
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
                    <li>
                      <p>
                        {rankingDB !== null
                          ? rankingDB.tetrisranker[0] !== undefined
                            ? rankingDB.tetrisranker[0].address
                            : "순위없음"
                          : "순위없음"}
                      </p>
                      <button
                        className="accept__btn"
                        onClick={(e) => {
                          if (
                            rankingDB !== null &&
                            rankingDB.tetrisranker[0] !== undefined
                          ) {
                            setClaim(rankingDB.tetrisranker[0].address, 1000);
                            e.currentTarget.setAttribute("hidden", "true");
                          }
                        }}
                      >
                        signed
                      </button>
                    </li>
                    <li>
                      <p>
                        {rankingDB !== null
                          ? rankingDB.tetrisranker[1] !== undefined
                            ? rankingDB.tetrisranker[1].address
                            : "순위없음"
                          : "순위없음"}
                      </p>
                      <button
                        className="accept__btn"
                        onClick={(e) => {
                          if (
                            rankingDB !== null &&
                            rankingDB.tetrisranker[1] !== undefined
                          ) {
                            setClaim(rankingDB.tetrisranker[1].address, 600);
                            e.currentTarget.setAttribute("hidden", "true");
                          }
                        }}
                      >
                        signed
                      </button>
                    </li>
                    <li>
                      <p>
                        {rankingDB !== null
                          ? rankingDB.tetrisranker[2] !== undefined
                            ? rankingDB.tetrisranker[2].address
                            : "순위없음"
                          : "순위없음"}
                      </p>
                      <button
                        className="accept__btn"
                        onClick={(e) => {
                          if (
                            rankingDB !== null &&
                            rankingDB.tetrisranker[2] !== undefined
                          ) {
                            setClaim(rankingDB.tetrisranker[2].address, 400);
                            e.currentTarget.setAttribute("hidden", "true");
                          }
                        }}
                      >
                        signed
                      </button>
                    </li>
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
                    <li>
                      <p>
                        {rankingDB !== null
                          ? rankingDB.puzzleranker[0] !== undefined
                            ? rankingDB.puzzleranker[0].address
                            : "순위없음"
                          : "순위없음"}
                      </p>
                      <button
                        className="accept__btn"
                        onClick={(e) => {
                          if (
                            rankingDB !== null &&
                            rankingDB.puzzleranker[0] !== undefined
                          ) {
                            setClaim(rankingDB.puzzleranker[0].address, 1000);
                            e.currentTarget.setAttribute("hidden", "true");
                          }
                        }}
                      >
                        signed
                      </button>
                    </li>
                    <li>
                      <p>
                        {rankingDB !== null
                          ? rankingDB.puzzleranker[1] !== undefined
                            ? rankingDB.puzzleranker[1].address
                            : "순위없음"
                          : "순위없음"}
                      </p>
                      <button
                        className="accept__btn"
                        onClick={(e) => {
                          if (
                            rankingDB !== null &&
                            rankingDB.puzzleranker[1] !== undefined
                          ) {
                            setClaim(rankingDB.puzzleranker[1].address, 600);
                            e.currentTarget.setAttribute("hidden", "true");
                          }
                        }}
                      >
                        signed
                      </button>
                    </li>
                    <li>
                      <p>
                        {rankingDB !== null
                          ? rankingDB.puzzleranker[2] !== undefined
                            ? rankingDB.puzzleranker[2].address
                            : "순위없음"
                          : "순위없음"}
                      </p>
                      <button
                        className="accept__btn"
                        onClick={(e) => {
                          if (
                            rankingDB !== null &&
                            rankingDB.puzzleranker[2] !== undefined
                          ) {
                            setClaim(rankingDB.puzzleranker[2].address, 400);
                            e.currentTarget.setAttribute("hidden", "true");
                          }
                        }}
                      >
                        signed
                      </button>
                    </li>
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
                    <li>
                      <p>
                        {rankingDB !== null
                          ? rankingDB.mineranker[0] !== undefined
                            ? rankingDB.mineranker[0].address
                            : "순위없음"
                          : "순위없음"}
                      </p>
                      <button
                        className="accept__btn"
                        onClick={(e) => {
                          if (
                            rankingDB !== null &&
                            rankingDB.mineranker[0] !== undefined
                          ) {
                            setClaim(rankingDB.mineranker[0].address, 1000);
                            e.currentTarget.setAttribute("hidden", "true");
                          }
                        }}
                      >
                        signed
                      </button>
                    </li>
                    <li>
                      <p>
                        {rankingDB !== null
                          ? rankingDB.mineranker[1] !== undefined
                            ? rankingDB.mineranker[1].address
                            : "순위없음"
                          : "순위없음"}
                      </p>
                      <button
                        className="accept__btn"
                        onClick={(e) => {
                          if (
                            rankingDB !== null &&
                            rankingDB.mineranker[1] !== undefined
                          ) {
                            setClaim(rankingDB.mineranker[1].address, 600);
                            e.currentTarget.setAttribute("hidden", "true");
                          }
                        }}
                      >
                        signed
                      </button>
                    </li>
                    <li>
                      <p>
                        {rankingDB !== null
                          ? rankingDB.mineranker[2] !== undefined
                            ? rankingDB.mineranker[2].address
                            : "순위없음"
                          : "순위없음"}
                      </p>
                      <button
                        className="accept__btn"
                        onClick={(e) => {
                          if (
                            rankingDB !== null &&
                            rankingDB.mineranker[2] !== undefined
                          ) {
                            setClaim(rankingDB.mineranker[2].address, 400);
                            e.currentTarget.setAttribute("hidden", "true");
                          }
                        }}
                      >
                        signed
                      </button>
                    </li>
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

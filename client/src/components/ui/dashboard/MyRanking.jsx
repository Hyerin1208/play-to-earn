import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import "./my-ranking.css";
import Carousel from "react-elastic-carousel";

const MyRanking = () => {
  const [rankingDB, setRankingDB] = useState(null);

  const account = useSelector((state) => state.AppState.account);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (account !== null) {
      axios
        .post(`http://localhost:5000/game/ranking`, { address: account })
        .then((response) => {
          const data = response.data;
          console.log(data);
          setRankingDB(data);
        });

      setLoading(false);
    }
  }, [account]);
  return (
    <div className="myrank__card">
      {loading ? (
        <strong> loading... </strong>
      ) : (
        <div className="carousel__box">
          <Carousel itemsToShow={1}>
            <div className="carousel__card" numbers="1">
              <div className="myrank__content">
                <div className="myrank__chart">
                  <i className="ri-sort-asc"></i>
                </div>
                <div className="myrank__text">
                  <div className="rank__mybox">
                    SnakeGame <br />
                    {rankingDB !== null
                      ? rankingDB.snakeMyRanking === 0
                        ? "순위없음"
                        : rankingDB.snakeMyRanking + " 등"
                      : false}
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel__card" numbers="2">
              <div className="myrank__content">
                <div className="myrank__chart">
                  <i className="ri-sort-asc"></i>
                </div>
                <div className="myrank__text">
                  <div className="rank__mybox">
                    TetrisGame <br />
                    {rankingDB !== null
                      ? rankingDB.tetrisMyRanking === 0
                        ? "순위없음"
                        : rankingDB.tetrisMyRanking + " 등"
                      : false}
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel__card" numbers="3">
              <div className="myrank__content">
                <div className="myrank__chart">
                  <i className="ri-sort-asc"></i>
                </div>
                <div className="myrank__text">
                  <div className="rank__mybox">
                    2048Game <br />
                    {rankingDB !== null
                      ? rankingDB.puzzleMyRanking === 0
                        ? "순위없음"
                        : rankingDB.puzzleMyRanking + " 등"
                      : false}
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel__card" numbers="4">
              <div className="myrank__content">
                <div className="myrank__chart">
                  <i className="ri-sort-asc"></i>
                </div>
                <div className="myrank__text">
                  <div className="rank__mybox">
                    MineGame <br />
                    {rankingDB !== null
                      ? rankingDB.mineMyRanking === 0
                        ? "순위없음"
                        : rankingDB.mineMyRanking + " 등"
                      : false}
                  </div>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default MyRanking;

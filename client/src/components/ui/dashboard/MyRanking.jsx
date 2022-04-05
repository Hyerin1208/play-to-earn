import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import "./my-ranking.css";
import Carousel from "react-elastic-carousel";
import { Card } from "reactstrap";

const MyRanking = () => {
  const [snake, setSnake] = useState([]);
  const [snakeT, setSnakeT] = useState(null);
  const [snakeI, setSnakeI] = useState(null);

  const [puzzle, setPuzzle] = useState([]);
  const [puzzleT, setPuzzleT] = useState(null);
  const [puzzleI, setPuzzleI] = useState(null);

  const [mine, setMine] = useState([]);
  const [mineT, setMineT] = useState(null);
  const [mineI, setMineI] = useState(null);

  const [tetris, setTetris] = useState([]);
  const [tetrisT, setTetrisT] = useState(null);
  const [tetrisI, setTetrisI] = useState(null);

  const account = useSelector((state) => state.AppState.account);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/game/snake`).then((response) => {
      const data = response.data;
      setSnake(data);
      const snakeIndex = data.findIndex((element) => {
        if (element.address === account) {
          setSnakeI(element);
          return true;
        }
      });
      setSnakeT(snakeIndex);
    });

    axios.get(`http://localhost:5000/game/tetris`).then((response) => {
      const data = response.data;
      setTetris(data);
      const tetrisIndex = data.findIndex((element) => {
        if (element.address === account) {
          setTetrisI(element);
          return true;
        }
      });
      setTetrisT(tetrisIndex);
    });

    axios.get(`http://localhost:5000/game/mine`).then((response) => {
      const data = response.data;
      setMine(data);
      const mineIndex = data.findIndex((element) => {
        if (element.address === account) {
          setMineI(element);
          return true;
        }
      });
      setMineT(mineIndex);
    });

    axios.get(`http://localhost:5000/game/2048`).then((response) => {
      const data = response.data;
      setPuzzle(data);
      const puzzleIndex = data.findIndex((element) => {
        if (element.address === account) {
          setPuzzleI(element);
          return true;
        }
      });
      setPuzzleT(puzzleIndex);
    });
    setLoading(false);
  }, []);

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
                  <i className="ri-hand-coin-line"></i>
                </div>
                <div className="myrank__text">
                  <div className="rank__mybox">
                    SnakeGame <br />
                    {snakeI === null ? "None" : snakeT + 1 + "위"}
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel__card" numbers="2">
              <div className="myrank__content">
                <div className="myrank__chart">
                  <i className="ri-hand-coin-line"></i>
                </div>
                <div className="myrank__text">
                  <div className="rank__mybox">
                    TetrisGame <br />
                    {tetrisI === null ? "None" : tetrisT + 1 + "위"}
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel__card" numbers="3">
              <div className="myrank__content">
                <div className="myrank__chart">
                  <i className="ri-hand-coin-line"></i>
                </div>
                <div className="myrank__text">
                  <div className="rank__mybox">
                    2048Game <br />
                    {puzzleI === null ? "None" : puzzleT + 1 + "위"}
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel__card" numbers="4">
              <div className="myrank__content">
                <div className="myrank__chart">
                  <i className="ri-hand-coin-line"></i>
                </div>
                <div className="myrank__text">
                  <div className="rank__mybox">
                    MineGame <br />
                    {mineI === null ? "None" : mineT + 1 + "위"}
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

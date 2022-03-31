import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import "./my-ranking.css";

const MyRanking = () => {
  const account = useSelector((state) => state.AppState.account);

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

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // const [ranking, setRanking] = useState("7");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/game/snake`)
      .then((response) => {
        console.log(response);
        const data = response.data;
        setSnake(data);
        const snakeIndex = data.findIndex((element) => {
          if (element.address === account) {
            setSnakeI(element);
            return true;
          }
        });
        setSnakeT(snakeIndex);
      })
      .catch((error) => {
        setError(error);
      });

    axios
      .get(`http://localhost:5000/game/2048`)
      .then((response) => {
        console.log(response);
        const data = response.data;
        setPuzzle(data);
        const puzzleIndex = data.findIndex((element) => {
          if (element.address === account) {
            setPuzzleI(element);
            return true;
          }
        });
        setPuzzleT(puzzleIndex);
      })
      .catch((error) => {
        setError(error);
      });

    axios
      .get(`http://localhost:5000/game/mine`)
      .then((response) => {
        console.log(response);
        const data = response.data;
        setMine(data);
        const mineIndex = data.findIndex((element) => {
          if (element.address === account) {
            setMineI(element);
            return true;
          }
        });
        setMineT(mineIndex);
      })
      .catch((error) => {
        setError(error);
      });

    axios
      .get(`http://localhost:5000/game/tetris`)
      .then((response) => {
        console.log(response);
        const data = response.data;
        setTetris(data);
        const tetrisIndex = data.findIndex((element) => {
          if (element.address === account) {
            setTetrisI(element);
            return true;
          }
        });
        setTetrisT(tetrisIndex);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <div className="myrank__card">
      {loading ? (
        <strong> loading... </strong>
      ) : (
        <div className="myrank__content">
          <div className="myrank__chart">
            <i className="ri-hand-coin-line"></i>
          </div>
          <div className="myrank__text">
            <div className="rank__mybox">
              {/* {ranking} 위<span>In top 0.342%</span> */}
              <div>slick 써서 밑에꺼 게임별로 넘기게 해주면 좋을 거 같다.</div>
              <div>
                <b>SnakeGame</b>
                <br />
                {snake
                  .filter((v, i) => {
                    return i < 1;
                  })
                  .map((v, i) => {
                    return (
                      <div key={i}>
                        {v.snakePoint === null ? "없음" : snakeT + 1 + "등"}
                      </div>
                    );
                  })}
                <br />
                <b>2048Game</b>
                <br />
                {puzzle
                  .filter((v, i) => {
                    return i < 1;
                  })
                  .map((v, i) => {
                    return (
                      <div key={i}>
                        {v.puzzlePoint === null ? "없음" : puzzleT + 1 + "등"}
                      </div>
                    );
                  })}
                <br />
                <b>TetrisGame</b>
                <br />
                {tetris
                  .filter((v, i) => {
                    return i < 1;
                  })
                  .map((v, i) => {
                    return (
                      <div key={i}>
                        {v.tetrisPoint === null ? "없음" : tetrisT + 1 + "등"}
                      </div>
                    );
                  })}
                <br />
                <b>MineGame</b>
                <br />
                {mine
                  .filter((v, i) => {
                    return i < 1;
                  })
                  .map((v, i) => {
                    return (
                      <div key={i}>
                        {v.minePoint === null ? "없음" : mineT + 1 + "등"}
                      </div>
                    );
                  })}
              </div>
            </div>
            <button className="get__token">Get My Token</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRanking;

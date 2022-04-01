import { useEffect, useState } from "react";
import { Col, Container } from "reactstrap";
import CommonSection from "../ui/CommonSection";
import "./ranking.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Ranking = () => {
  const [toggleState, setToggleState] = useState(1);
  const account = useSelector((state) => state.AppState.account);

  // Claim부분
  const [balance, setBalance] = useState(0);
  const [claim, setClaim] = useState(true);
  const [snakeAddress, setSnakeAddress] = useState([]);
  const [puzzleAddress, setPuzzleAddress] = useState([]);
  const [tetrisAddress, setTetrisAddress] = useState([]);
  const [mineAddress, setMineAddress] = useState([]);

  // console.log(snakeAddress);
  // console.log(puzzleAddress);
  // console.log(tetrisAddress);
  // console.log(mineAddress);

  const sendReward = async () => {
    await axios
      .post(`http://localhost:5000/ranking`, {
        tetrisAddress,
        puzzleAddress,
        snakeAddress,
        mineAddress,
        claim,
      })
      .then((res) => {
        console.log(res.data);
        alert("토큰 클레임 완료");
      });
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };

  // 변수 뒤에 T => 배열의 인덱스
  // 변수 뒤에 I => 받은 데이터의 배열
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

  // var count = 1;
  // const timer = setInterval(function () {
  //   count++;
  // }, 30 * 60 * 1000);
  // console.log(timer);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/game/snake`)
      .then((response) => {
        const data = response.data;
        setSnake(data);

        const snakeArray = data.map((data, index) => {
          const form = {
            weeks: 1,
            games: "snakeGame",
            rank: index + 1,
            address: data.address,
            balance: [1000, 600, 400],
          };
          return form;
        });
        setSnakeAddress(snakeArray);

        const snakeIndex = data.findIndex((element) => {
          if (element.address === account) {
            setSnakeI(element);
            return true;
          }
        });
        setSnakeT(snakeIndex);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });

    axios
      .get(`http://localhost:5000/game/2048`)
      .then((response) => {
        const data = response.data;

        const puzzleArray = data.map((data, index) => {
          const form = {
            weeks: 1,
            games: "puzzleGame",
            rank: index + 1,
            address: data.address,
            balance: [1000, 600, 400],
          };
          return form;
        });
        setPuzzleAddress(puzzleArray);

        setPuzzle(data);
        const puzzleIndex = data.findIndex((element) => {
          if (element.address === account) {
            setPuzzleI(element);
            return true;
          }
        });
        setPuzzleT(puzzleIndex);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });

    axios
      .get(`http://localhost:5000/game/mine`)
      .then((response) => {
        const data = response.data;
        setMine(data);

        const mineArray = data.map((data, index) => {
          const form = {
            weeks: 1,
            games: "mineGame",
            rank: index + 1,
            address: data.address,
            balance: [1000, 600, 400],
          };
          return form;
        });
        setMineAddress(mineArray);

        const mineIndex = data.findIndex((element) => {
          if (element.address === account) {
            setMineI(element);
            return true;
          }
        });
        setMineT(mineIndex);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });

    axios
      .get(`http://localhost:5000/game/tetris`)
      .then((response) => {
        const data = response.data;
        setTetris(data);

        const tetrisArray = data.map((data, index) => {
          const form = {
            weeks: 1,
            games: "tetrisGame",
            rank: index + 1,
            address: data.address,
            balance: [1000, 600, 400],
          };
          return form;
        });
        setTetrisAddress(tetrisArray);

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
    <>
      <CommonSection title="Ranking" />
      {loading ? (
        <strong> loading... </strong>
      ) : (
        <div className="Ranking__container">
          <div className="bloc-tabs">
            <button
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              OVERALL RANKING
            </button>
            <button
              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              WEEKLY RANKING
            </button>
            <button
              className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(3)}
            >
              MY RANKING
            </button>
          </div>

          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? "content  active-content" : "content"
              }
            >
              <h2>OVERALL RANKING</h2>
              <hr />
              <Container>
                <div className="ranking__box">
                  <div>
                    <b>SnakeGame</b>
                    <br />
                    {snake
                      .filter((v, i) => {
                        return i < 3;
                      })
                      .map((v, i) => {
                        return (
                          <p key={i}>
                            {i + 1}등 :&nbsp;
                            {v === undefined
                              ? "None"
                              : v.snakePoint === null
                              ? "None"
                              : v.nick}
                            &nbsp;
                            {v === undefined
                              ? ""
                              : v.snakePoint === null
                              ? ""
                              : v.snakePoint + "점"}
                          </p>
                        );
                      })}

                    <br />
                    <b>TetrisGame</b>
                    <br />
                    {tetris
                      .filter((v, i) => {
                        return i < 3;
                      })
                      .map((v, i) => {
                        return (
                          <p key={i}>
                            {i + 1}등 :&nbsp;
                            {v === undefined
                              ? "None"
                              : v.tetrisPoint === null
                              ? "None"
                              : v.nick}
                            &nbsp;
                            {v === undefined
                              ? ""
                              : v.tetrisPoint === null
                              ? ""
                              : v.tetrisPoint + "점"}
                          </p>
                        );
                      })}

                    <br />
                    <b>2048Game</b>
                    <br />
                    {puzzle
                      .filter((v, i) => {
                        return i < 3;
                      })
                      .map((v, i) => {
                        return (
                          <p key={i}>
                            {i + 1}등 :&nbsp;
                            {v === undefined
                              ? "None"
                              : v.puzzlePoint === null
                              ? "None"
                              : v.nick}
                            &nbsp;
                            {v === undefined
                              ? ""
                              : v.puzzlePoint === null
                              ? ""
                              : v.puzzlePoint + "점"}
                          </p>
                        );
                      })}
                    <br />
                    <b>MineGame</b>
                    <br />
                    {mine
                      .filter((v, i) => {
                        return i < 3;
                      })
                      .map((v, i) => {
                        return (
                          <p key={i}>
                            {i + 1}등 :&nbsp;
                            {v === undefined
                              ? "None"
                              : v.minePoint === null
                              ? "None"
                              : v.nick}
                            &nbsp;
                            {v === undefined
                              ? ""
                              : v.minePoint === null
                              ? ""
                              : v.minePoint + "초"}
                          </p>
                        );
                      })}
                  </div>
                </div>
                <button type="submit" onClick={sendReward}>
                  SEND RANKING DB
                </button>
              </Container>
            </div>

            <div
              className={
                toggleState === 2 ? "content  active-content" : "content"
              }
            >
              <h2>WEEKLY RANKING</h2>
              <hr />
              <Container>
                <div className="ranking__box">여기에 주간랭킹 순위표만들기</div>
              </Container>
            </div>

            <div
              className={
                toggleState === 3 ? "content  active-content" : "content"
              }
            >
              <h2>MY RANKING</h2>
              <hr />
              <Container>
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
                          {v.snakePoint === null ? "None" : snakeT + 1 + "등"}
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
                          {v.puzzlePoint === null ? "None" : puzzleT + 1 + "등"}
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
                          {v.tetrisPoint === null ? "None" : tetrisT + 1 + "등"}
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
                          {v.minePoint === null ? "None" : mineT + 1 + "등"}
                        </div>
                      );
                    })}
                </div>
              </Container>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Ranking;

import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import CommonSection from "../../ui/templete/CommonSection";
import "./ranking.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Clock from "./Clock";

const Ranking = () => {
  const [loading, setLoading] = useState(true);
  const [toggleState, setToggleState] = useState(1);
  const account = useSelector((state) => state.AppState.account);

  // Claim부분
  const [snakeAddress, setSnakeAddress] = useState([]);
  const [puzzleAddress, setPuzzleAddress] = useState([]);
  const [tetrisAddress, setTetrisAddress] = useState([]);
  const [mineAddress, setMineAddress] = useState([]);

  const sendReward = async () => {
    await axios
      .post(`http://localhost:5000/ranking`, {
        tetrisAddress,
        puzzleAddress,
        snakeAddress,
        mineAddress,
      })
      .then((res) => {
        console.log(res.data);
        alert("DB 전송 완료");
      });
  };

  // const [timerDays, setTimerDays] = useState();
  // const [timerHours, setTimerHours] = useState();
  // const [timerMinutes, setTimerMinutes] = useState();
  // const [timerSeconds, setTimerSeconds] = useState();

  // let interval;

  // const startTimer = () => {
  //   const countDownDate = new Date("May 01, 2022").getTime();

  //   interval = setInterval(() => {
  //     const now = new Date().getTime();

  //     const distance = countDownDate - now;

  //     const days = Math.floor(distance / (24 * 60 * 60 * 1000));

  //     const hours = Math.floor(
  //       (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
  //     );

  //     const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));

  //     const seconds = Math.floor((distance % (60 * 1000)) / 1000);

  //     if (distance < 0) {
  //       //Stop Timer

  //       clearInterval(interval.current);
  //     } else {
  //       // Update Timer
  //       setTimerDays(days);
  //       setTimerHours(hours);
  //       setTimerMinutes(minutes);
  //       setTimerSeconds(seconds);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   startTimer();
  // }, []);

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

  const [count, setCount] = useState([]);
  console.log(count);

  useEffect(() => {
    axios.get(`http://localhost:5000/ranking`).then((response) => {
      const data = response.data;
      const weekArray = data
        .filter((v, i) => {
          return i < 1;
        })
        .map((data, index) => {
          const form = {
            count: data.weeks,
          };
          return form;
        });
      setCount(weekArray);
      console.log(weekArray);
    });

    axios
      .get(`http://localhost:5000/game/snake`)
      .then((response) => {
        const data = response.data;
        setSnake(data);

        const snakeArray = data.map((data, index) => {
          const form = {
            weeks: count + 1,
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
      })
      .catch((error) => {
        setError(error);
      });

    axios
      .get(`http://localhost:5000/game/2048`)
      .then((response) => {
        const data = response.data;
        setPuzzle(data);

        const puzzleArray = data.map((data, index) => {
          const form = {
            weeks: count + 1,
            games: "puzzleGame",
            rank: index + 1,
            address: data.address,
            balance: [1000, 600, 400],
          };
          return form;
        });
        setPuzzleAddress(puzzleArray);

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
        const data = response.data;
        setMine(data);

        const mineArray = data.map((data, index) => {
          const form = {
            weeks: count + 1,
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
            weeks: count + 1,
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
      })
      .catch((error) => {
        setError(error);
      });
    setLoading(false);
  }, []);

  return (
    <>
      <CommonSection title="Ranking" />
      {loading ? (
        <strong> loading... </strong>
      ) : (
        <div className="Ranking__container">
          <Row>
            <Col lg="8" md="6" sm="6">
              <div className="bloc-tabs">
                <button
                  className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(1)}
                >
                  Overall Ranking
                </button>
                <button
                  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(2)}
                >
                  Weekly Ranking
                </button>
                <button
                  className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(3)}
                >
                  My Ranking
                </button>
              </div>

              <div className="content-tabs">
                <div
                  className={
                    toggleState === 1 ? "content  active-content" : "content"
                  }
                >
                  <h2>Overall Ranking</h2>
                  <hr />
                  <Container className="my__rank">
                    <div className="ranking__box">
                      <ul>
                        <li>SnakeGame</li>
                        <br />
                        {snake
                          .filter((v, i) => {
                            return i < 5;
                          })
                          .map((v, i) => {
                            return (
                              <p key={i}>
                                {i + 1}등 :&nbsp;
                                {v === undefined
                                  ? "없음"
                                  : v.snakePoint === null
                                  ? "없음"
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
                        <li>TetrisGame</li>
                        <br />
                        {tetris
                          .filter((v, i) => {
                            return i < 5;
                          })
                          .map((v, i) => {
                            return (
                              <p key={i}>
                                {i + 1}등 :&nbsp;
                                {v === undefined
                                  ? "없음"
                                  : v.tetrisPoint === null
                                  ? "없음"
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
                        <li>2048Game</li>
                        <br />
                        {puzzle
                          .filter((v, i) => {
                            return i < 5;
                          })
                          .map((v, i) => {
                            return (
                              <p key={i}>
                                {i + 1}등 :&nbsp;
                                {v === undefined
                                  ? "없음"
                                  : v.puzzlePoint === null
                                  ? "없음"
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
                        <li>MineGame</li>
                        <br />
                        {mine
                          .filter((v, i) => {
                            return i < 5;
                          })
                          .map((v, i) => {
                            return (
                              <p key={i}>
                                {i + 1}등 :&nbsp;
                                {v === undefined
                                  ? "없음"
                                  : v.minePoint === null
                                  ? "없음"
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
                      </ul>
                    </div>
                  </Container>
                </div>

                <div
                  className={
                    toggleState === 2 ? "content  active-content" : "content"
                  }
                >
                  <h2>Weekly Ranking</h2>
                  <hr />
                  <Container>
                    <div className="ranking__box">
                      여기에 주간랭킹 순위표만들기
                    </div>
                  </Container>
                </div>

                <div
                  className={
                    toggleState === 3 ? "content  active-content" : "content"
                  }
                >
                  <h2>My Ranking</h2>
                  <hr />
                  <Container className="my__rank">
                    <ul>
                      <li>SnakeGame</li>
                      <br />
                      {snake
                        .filter((v, i) => {
                          return i < 1;
                        })
                        .map((v, i) => {
                          return (
                            <div key={i}>
                              {v.snakePoint === null
                                ? "없음"
                                : snakeT + 1 + "등"}
                            </div>
                          );
                        })}
                      <br />
                      <li>2048Game</li>
                      <br />
                      {puzzle
                        .filter((v, i) => {
                          return i < 1;
                        })
                        .map((v, i) => {
                          console.log("v", v.puzzlePoint);
                          return (
                            <div key={i}>
                              {v.puzzlePoint === null
                                ? "없음"
                                : puzzleT + 1 + "등"}
                            </div>
                          );
                        })}
                      <br />
                      <li>TetrisGame</li>
                      <br />
                      {tetris
                        .filter((v, i) => {
                          return i < 1;
                        })
                        .map((v, i) => {
                          return (
                            <div key={i}>
                              {v.tetrisPoint === null
                                ? "없음"
                                : tetrisT + 1 + "등"}
                            </div>
                          );
                        })}
                      <br />
                      <li>MineGame</li>
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
                    </ul>
                  </Container>
                </div>
              </div>
            </Col>
            <Col className="time__limit" lg="4" md="3" sm="3">
              <h4>Time Limit</h4>
              {/* <Clock
                className="clock__box"
                timerDays={timerDays}
                timerHours={timerHours}
                timerMinutes={timerMinutes}
                timerSeconds={timerSeconds}
              /> */}
              <div type="button" onClick={sendReward}>
                Claim All Reward!!
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Ranking;

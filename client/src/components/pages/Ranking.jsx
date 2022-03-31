import { useEffect, useState } from "react";
import { Col, Container } from "reactstrap";
import CommonSection from "../ui/CommonSection";
import "./ranking.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Ranking = () => {
  const [toggleState, setToggleState] = useState(1);
  const account = useSelector((state) => state.AppState.account);

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
                  {/* {loading ? (
                  <strong> loading... </strong>
                ) : ( */}
                  <div>
                    <b>SnakeGame</b>
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
                        return i < 5;
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
                        return i < 5;
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
                        return i < 5;
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
                  {/* )} */}
                </div>
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
                            {v.puzzlePoint === null
                              ? "None"
                              : puzzleT + 1 + "등"}
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
                            {v.tetrisPoint === null
                              ? "None"
                              : tetrisT + 1 + "등"}
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

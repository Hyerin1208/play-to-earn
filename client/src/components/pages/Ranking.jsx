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

  const [snake, setSnake] = useState([]);
  const [snakeT, setSnakeT] = useState(null);
  const [snakeI, setSnakeI] = useState(null);

  const [puzzle, setPuzzle] = useState([]);
  const [mine, setMine] = useState([]);
  const [tetris, setTetris] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({});

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
        setPuzzle(response.data);
      })
      .catch((error) => {
        setError(error);
      });

    axios
      .get(`http://localhost:5000/game/mine`)
      .then((response) => {
        console.log(response);
        setMine(response.data);
      })
      .catch((error) => {
        setError(error);
      });

    axios
      .get(`http://localhost:5000/game/tetris`)
      .then((response) => {
        console.log(response);
        setTetris(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);
  console.log(snakeI);
  console.log(snakeT);

  // myRanking 스네이크게임
  // function isSnake(element) {
  //   if (element.address === account) {
  //     console.log(element);
  //     return true;
  //   }
  // }
  // const snakeIndex = snake.findIndex(isSnake);
  const snakeIndex = snake.findIndex((element) => {
    if (element.address === account) {
      console.log(element);
      return true;
    }
  });
  console.log(snakeIndex);

  function snakeRank(element) {
    if (element.address === account && element.snakePoint !== null) {
      console.log(element);
      return true;
    }
  }
  const snakeR = snake.find(snakeRank);

  // myRanking 테트리스게임
  function isTetris(element) {
    if (element.address === account) {
      return true;
    }
  }
  const tetrisIndex = tetris.findIndex(isTetris);

  function tetrisRank(element) {
    if (element.address === account) {
      return true;
    }
  }
  const tetrisR = tetris.find(tetrisRank);

  // myRanking 2048게임
  function isPuzzle(element) {
    if (element.address === account) {
      return true;
    }
  }
  const puzzleIndex = puzzle.findIndex(isPuzzle);

  function puzzleRank(element) {
    if (element.address === account) {
      return true;
    }
  }
  const puzzleR = puzzle.find(puzzleRank);

  // myRanking 지뢰찾기게임
  function isMine(element) {
    if (element.address === account) {
      return true;
    }
  }
  const mineIndex = mine.findIndex(isMine);

  function mineRank(element) {
    if (element.address === account) {
      return true;
    }
  }
  const mineR = mine.find(mineRank);

  return (
    <>
      <CommonSection title="Ranking" />
      <div className="Ranking__container">
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            종합랭킹
          </button>
          <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            주간랭킹
          </button>
          <button
            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            MY랭킹
          </button>
        </div>

        <div className="content-tabs">
          <div
            className={
              toggleState === 1 ? "content  active-content" : "content"
            }
          >
            <h2>종합랭킹</h2>
            <hr />
            <Container>
              <div className="ranking__box">
                {loading ? (
                  <strong> loading... </strong>
                ) : (
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
                  </div>
                )}
              </div>
            </Container>
          </div>

          <div
            className={
              toggleState === 2 ? "content  active-content" : "content"
            }
          >
            <h2>주간랭킹</h2>
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
            <h2>나의랭킹</h2>
            <hr />
            <Container>
              <p>여기에 나의랭킹 페이지만들기</p>
              <div>
                {loading ? (
                  <strong> loading... </strong>
                ) : (
                  <p>
                    <b>SnakeGame</b>
                    <br />
                    {snakeR.snakePoint === null
                      ? "아직 점수 없음"
                      : snakeIndex + 1 + "등"}
                    &nbsp;
                    <br />
                    <b>2048Game</b>
                    <br />
                    {puzzleR.puzzlePoint === null
                      ? "아직 점수 없음"
                      : puzzleIndex + 1 + "등"}
                    &nbsp;
                    <br />
                    <b>TetrisGame</b>
                    <br />
                    {tetrisR.tetrisPoint === null
                      ? "아직 점수 없음"
                      : tetrisIndex + 1 + "등"}
                    <br />
                    <b>MineGame</b>
                    <br />
                    {mineR.minePoint === null
                      ? "아직 점수 없음"
                      : mineIndex + 1 + "등"}
                  </p>
                )}
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ranking;

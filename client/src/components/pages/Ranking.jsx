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
  const [puzzle, setPuzzle] = useState([]);
  const [mine, setMine] = useState([]);
  const [tetris, setTetris] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ddd");
    axios
      .get(`http://localhost:5000/game/snake`)
      .then((response) => {
        console.log(response);
        setSnake(response.data);
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
        setTimeout(1000);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  function isSnake(element) {
    if (element.address === account) {
      console.log(element);
      return true;
    }
  }
  const snakeRank = snake.findIndex(isSnake);
  console.log(snakeRank);

  function isTetris(element) {
    if (element.address === account) {
      console.log(element);
      return true;
    }
  }
  const tetrisRank = tetris.findIndex(isTetris);
  console.log(tetrisRank);

  function isPuzzle(element) {
    if (element.address === account) {
      console.log(element);
      return true;
    }
  }
  const puzzleRank = tetris.findIndex(isPuzzle);
  console.log(puzzleRank);

  function isMine(element) {
    if (element.address === account) {
      console.log(element);
      return true;
    }
  }
  const mineRank = tetris.findIndex(isMine);
  console.log(mineRank);

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
                    <p>
                      1등 :&nbsp;
                      {snake[0] === undefined
                        ? "없음"
                        : snake[0].snakePoint === null
                        ? "없음"
                        : snake[0].nick}
                      &nbsp;
                      {snake[0] === undefined
                        ? ""
                        : snake[0].snakePoint === null
                        ? ""
                        : snake[0].snakePoint}
                    </p>
                    <p>
                      2등 :&nbsp;
                      {snake[1] === undefined
                        ? "없음"
                        : snake[1].snakePoint === null
                        ? "없음"
                        : snake[1].nick}
                      &nbsp;
                      {snake[1] === undefined
                        ? ""
                        : snake[1].snakePoint === null
                        ? ""
                        : snake[1].snakePoint}
                    </p>
                    <p>
                      3등 :&nbsp;
                      {snake[2] === undefined
                        ? "없음"
                        : snake[2].snakePoint === null
                        ? "없음"
                        : snake[2].nick}
                      &nbsp;
                      {snake[2] === undefined
                        ? ""
                        : snake[2].snakePoint === null
                        ? ""
                        : snake[2].snakePoint}
                    </p>
                    <p>
                      4등 :&nbsp;
                      {snake[3] === undefined
                        ? "없음"
                        : snake[3].snakePoint === null
                        ? "없음"
                        : snake[3].nick}
                      &nbsp;
                      {snake[3] === undefined
                        ? ""
                        : snake[3].snakePoint === null
                        ? ""
                        : snake[3].snakePoint}
                    </p>
                    <p>
                      5등 :&nbsp;
                      {snake[4] === undefined
                        ? "없음"
                        : snake[4].snakePoint === null
                        ? "없음"
                        : snake[4].nick}
                      &nbsp;
                      {snake[4] === undefined
                        ? ""
                        : snake[4].snakePoint === null
                        ? ""
                        : snake[4].snakePoint}
                    </p>
                    <br />
                    <b>TetrisGame</b>
                    <br />
                    <p>
                      1등 :&nbsp;
                      {tetris[0] === undefined
                        ? "없음"
                        : tetris[0].tetrisPoint === null
                        ? "없음"
                        : tetris[0].nick}
                      &nbsp;
                      {tetris[0] === undefined
                        ? ""
                        : tetris[0].tetrisPoint === null
                        ? ""
                        : tetris[0].tetrisPoint}
                    </p>
                    <p>
                      2등 :&nbsp;
                      {tetris[1] === undefined
                        ? "없음"
                        : tetris[1].tetrisPoint === null
                        ? "없음"
                        : tetris[1].nick}
                      &nbsp;
                      {tetris[1] === undefined
                        ? ""
                        : tetris[1].tetrisPoint === null
                        ? ""
                        : tetris[1].tetrisPoint}
                    </p>
                    <p>
                      3등 :&nbsp;
                      {tetris[2] === undefined
                        ? "없음"
                        : tetris[2].tetrisPoint === null
                        ? "없음"
                        : tetris[2].nick}
                      &nbsp;
                      {tetris[2] === undefined
                        ? ""
                        : tetris[2].tetrisPoint === null
                        ? ""
                        : tetris[2].tetrisPoint}
                    </p>
                    <p>
                      4등 :&nbsp;
                      {tetris[3] === undefined
                        ? "없음"
                        : tetris[3].tetrisPoint === null
                        ? "없음"
                        : tetris[3].nick}
                      &nbsp;
                      {tetris[3] === undefined
                        ? ""
                        : tetris[3].tetrisPoint === null
                        ? ""
                        : tetris[3].tetrisPoint}
                    </p>
                    <p>
                      5등 :&nbsp;
                      {tetris[4] === undefined
                        ? "없음"
                        : tetris[4].tetrisPoint === null
                        ? "없음"
                        : tetris[4].nick}
                      &nbsp;
                      {tetris[4] === undefined
                        ? ""
                        : tetris[4].tetrisPoint === null
                        ? ""
                        : tetris[4].tetrisPoint}
                    </p>

                    <br />
                    <b>2048Game</b>
                    <br />
                    <p>
                      1등 :&nbsp;
                      {puzzle[0] === undefined
                        ? "없음"
                        : puzzle[0].puzzlePoint === null
                        ? "없음"
                        : puzzle[0].nick}
                      &nbsp;
                      {puzzle[0] === undefined
                        ? ""
                        : puzzle[0].puzzlePoint === null
                        ? ""
                        : puzzle[0].puzzlePoint}
                    </p>
                    <p>
                      2등 :&nbsp;
                      {puzzle[1] === undefined
                        ? "없음"
                        : puzzle[1].puzzlePoint === null
                        ? "없음"
                        : puzzle[1].nick}
                      &nbsp;
                      {puzzle[1] === undefined
                        ? ""
                        : puzzle[1].puzzlePoint === null
                        ? ""
                        : puzzle[1].puzzlePoint}
                    </p>
                    <p>
                      3등 :&nbsp;
                      {puzzle[2] === undefined
                        ? "없음"
                        : puzzle[2].puzzlePoint === null
                        ? "없음"
                        : puzzle[2].nick}
                      &nbsp;
                      {puzzle[2] === undefined
                        ? ""
                        : puzzle[2].puzzlePoint === null
                        ? ""
                        : puzzle[2].puzzlePoint}
                    </p>
                    <p>
                      4등 :&nbsp;
                      {puzzle[3] === undefined
                        ? "없음"
                        : puzzle[3].puzzlePoint === null
                        ? "없음"
                        : puzzle[3].nick}
                      &nbsp;
                      {puzzle[3] === undefined
                        ? ""
                        : puzzle[3].puzzlePoint === null
                        ? ""
                        : puzzle[3].puzzlePoint}
                    </p>
                    <p>
                      5등 :&nbsp;
                      {puzzle[4] === undefined
                        ? "없음"
                        : puzzle[4].puzzlePoint === null
                        ? "없음"
                        : puzzle[4].nick}
                      &nbsp;
                      {puzzle[4] === undefined
                        ? ""
                        : puzzle[4].puzzlePoint === null
                        ? ""
                        : puzzle[4].puzzlePoint}
                    </p>
                    <br />
                    <b>MineGame</b>
                    <br />
                    <p>
                      1등 :&nbsp;
                      {mine[0] === undefined
                        ? "없음"
                        : mine[0].minePoint === null
                        ? "없음"
                        : mine[0].nick}
                      &nbsp;
                      {mine[0] === undefined
                        ? ""
                        : mine[0].minePoint === null
                        ? ""
                        : mine[0].minePoint}
                    </p>
                    <p>
                      2등 :&nbsp;
                      {mine[1] === undefined
                        ? "없음"
                        : mine[1].minePoint === null
                        ? "없음"
                        : mine[1].nick}
                      &nbsp;
                      {mine[1] === undefined
                        ? ""
                        : mine[1].minePoint === null
                        ? ""
                        : mine[1].minePoint}
                    </p>
                    <p>
                      3등 :&nbsp;
                      {mine[2] === undefined
                        ? "없음"
                        : mine[2].minePoint === null
                        ? "없음"
                        : mine[2].nick}
                      &nbsp;
                      {mine[2] === undefined
                        ? ""
                        : mine[2].minePoint === null
                        ? ""
                        : mine[2].minePoint}
                    </p>
                    <p>
                      4등 :&nbsp;
                      {mine[3] === undefined
                        ? "없음"
                        : mine[3].minePoint === null
                        ? "없음"
                        : mine[3].nick}
                      &nbsp;
                      {mine[3] === undefined
                        ? ""
                        : mine[3].minePoint === null
                        ? ""
                        : mine[3].minePoint}
                    </p>
                    <p>
                      5등 :&nbsp;
                      {mine[4] === undefined
                        ? "없음"
                        : mine[4].minePoint === null
                        ? "없음"
                        : mine[4].nick}
                      &nbsp;
                      {mine[4] === undefined
                        ? ""
                        : mine[4].minePoint === null
                        ? ""
                        : mine[4].minePoint}
                    </p>
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
                    {snakeRank.snakePoint === null ? "" : snakeRank + 1}
                    등 &nbsp;
                    <br />
                    <b>2048Game</b>
                    <br />
                    {puzzleRank.puzzlePoint === 632 ? "없음" : puzzleRank + 1}등
                    &nbsp;
                    <br />
                    <b>TetrisGame</b>
                    <br />
                    {tetrisRank + 1}등 &nbsp;
                    <br />
                    <b>MineGame</b>
                    <br />
                    {mineRank + 1}등 &nbsp;
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

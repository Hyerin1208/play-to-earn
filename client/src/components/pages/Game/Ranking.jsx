import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import CommonSection from "../../ui/templete/CommonSection";
import "./ranking.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Ranking = () => {
  const [loading, setLoading] = useState(true);
  const [toggleState, setToggleState] = useState(1);
  const account = useSelector((state) => state.AppState.account);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  // 변수 뒤에 T => 배열의 인덱스
  // 변수 뒤에 I => 받은 데이터의 배열
  const [snake, setSnake] = useState([]);
  const [snakeT, setSnakeT] = useState(null);
  const [snakeI, setSnakeI] = useState([]);

  const [puzzle, setPuzzle] = useState([]);
  const [puzzleT, setPuzzleT] = useState(null);
  const [puzzleI, setPuzzleI] = useState([]);

  const [mine, setMine] = useState([]);
  const [mineT, setMineT] = useState(null);
  const [mineI, setMineI] = useState([]);

  const [tetris, setTetris] = useState([]);
  const [tetrisT, setTetrisT] = useState(null);
  const [tetrisI, setTetrisI] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/game/snake`)
      .then((response) => {
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
        const data = response.data;
        setTetris(data);

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
                            return i < 3;
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
                            return i < 3;
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
                            return i < 3;
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
                            return i < 3;
                          })
                          .map((v, i) => {
                            return (
                              <p key={i}>
                                {i + 1}등 :&nbsp;
                                {v === undefined
                                  ? "없음"
                                  : v.minePoint === null
                                  ? ""
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
                      {snakeI.snakePoint !== null ? snakeT + 1 + "등" : "없음"}
                      <br />
                      <li>2048Game</li>
                      <br />
                      {puzzleI.puzzlePoint !== null
                        ? puzzleT + 1 + "등"
                        : "없음"}
                      <br />
                      <li>TetrisGame</li>
                      <br />
                      {tetrisI.tetrisPoint !== null
                        ? tetrisT + 1 + "등"
                        : "없음"}
                      <br />
                      <li>MineGame</li>
                      <br />
                      {mineI.minePoint !== null ? mineT + 1 + "등" : "없음"}
                    </ul>
                  </Container>
                </div>
              </div>
            </Col>
            <Col className="time__limit" lg="4" md="3" sm="3">
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Ranking;

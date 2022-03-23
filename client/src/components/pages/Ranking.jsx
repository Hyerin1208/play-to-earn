import { useEffect, useState } from "react";
import { Col, Container } from "reactstrap";
import CommonSection from "../ui/CommonSection";
import "./ranking.css";
import axios from "axios";

const Ranking = () => {
  const [toggleState, setToggleState] = useState(1);

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
      .get(`http://localhost:5000/snake/ttt`)
      .then((response) => {
        console.log(response);
        setSnake(response.data);
      })
      .catch((error) => {
        setError(error);
      });

    axios
      .get(`http://localhost:5000/2048`)
      .then((response) => {
        console.log(response);
        setPuzzle(response.data);
      })
      .catch((error) => {
        setError(error);
      });

    axios
      .get(`http://localhost:5000/mine`)
      .then((response) => {
        console.log(response);
        setMine(response.data);
      })
      .catch((error) => {
        setError(error);
      });

    axios
      .get(`http://localhost:5000/tetris`)
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
                    <p>1st : {snake[0]===undefined?"없음":snake[0].address}</p>
                    <p>2nd : {snake[1]===undefined?"없음":snake[1].address}</p>
                    <p>3rd : {snake[2]===undefined?"없음":snake[2].address}</p>
                    <p>4rd : {snake[3]===undefined?"없음": snake[3].address}</p>
                    <p>5rd : {snake[4]===undefined?"없음": snake[4].address}</p>
                    <br />
                    <b>TetrisGame</b>
                    <br />
                    <p>1st : {tetris[0]===undefined?"없음":tetris[0].address}</p>
                    <p>2nd : {tetris[1]===undefined?"없음":tetris[1].address}</p>
                    <p>3rd : {tetris[2]===undefined?"없음":tetris[2].address}</p>
                    <p>4rd : {tetris[3]===undefined?"없음": tetris[3].address}</p>
                    <p>5rd : {tetris[4]===undefined?"없음": tetris[4].address}</p>

                    <br />
                    <b>2048Game</b>
                    <br />
                    <p>1st : {puzzle[0]===undefined?"없음":puzzle[0].address}</p>
                    <p>2nd : {puzzle[1]===undefined?"없음":puzzle[1].address}</p>
                    <p>3rd : {puzzle[2]===undefined?"없음":puzzle[2].address}</p>
                    <p>4rd : {puzzle[3]===undefined?"없음": puzzle[3].address}</p>
                    <p>5rd : {puzzle[4]===undefined?"없음": puzzle[4].address}</p>
                    <br />
                    <b>MineSweepGame</b>
                    <br />
                    <p>1st : {mine[0]===undefined?"없음":mine[0].address}</p>
                    <p>2nd : {mine[1]===undefined?"없음":mine[1].address}</p>
                    <p>3rd : {mine[2]===undefined?"없음":mine[2].address}</p>
                    <p>4rd : {mine[3]===undefined?"없음": mine[3].address}</p>
                    <p>5rd : {mine[4]===undefined?"없음": mine[4].address}</p>
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
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ranking;

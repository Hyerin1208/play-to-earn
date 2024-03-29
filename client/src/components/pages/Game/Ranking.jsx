import { Fragment, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import CommonSection from "../../ui/templete/CommonSection";
import "./ranking.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Clock from "./Clock";
import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";

const Ranking = () => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #5900ff;
  `;
  const [loading, setLoading] = useState(true);
  const [toggleState, setToggleState] = useState(1);
  const account = useSelector((state) => state.AppState.account);
  const timer = useSelector((state) => state.AppState.timer);
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();
  const timerid = useRef(null);

  const [isStop, setIsStop] = useState(false);

  useEffect(() => {
    timerid.current = setInterval(async () => {
      const countdownDate = new Date(timer).getTime();

      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (!isStop) {
        // update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
    return () => {
      clearInterval(timerid.current);
      setIsStop(true);
    };
  }, [timer]);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [rankingDB, setRankingDB] = useState(null);
  const [weekly, setWeekly] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .post(`http://15.165.17.43:5000/game/ranking`, { address: account })
      .then((response) => {
        const data = response.data;
        setRankingDB(data);
      })
      .catch((error) => {
        setError(error);
        window.location.href = "/error";
      });
    setLoading(false);
  }, [account]);

  useEffect(() => {
    axios
      .post(`http://15.165.17.43:5000/game/weekly`)
      .then((response) => {
        const data = response.data;
        const sortData = data.map((v, i) => {
          const test = v.sort((a, b) => {
            if (a.games > b.games) return 1;
            if (a.games < b.games) return -1;
            if (a.rank < b.rank) return -1;
            if (a.rank > b.rank) return 1;
          });
          return test;
        });
        setWeekly(sortData);
      })
      .catch((error) => {
        setError(error);
        window.location.href = "/error";
      });
    setLoading(false);
  }, [account]);

  function RankingListForm(form) {
    const result = [];
    for (let i = 0; i < 3; i++) {
      if (form[i] === undefined) {
        result.push(
          <Fragment key={i}>
            <p>{i + 1}등 : 바로당신의 자리 </p>
          </Fragment>
        );
      } else {
        result.push(
          <Fragment key={i}>
            <p>
              {i + 1}등 : {form[i].nick}
            </p>
          </Fragment>
        );
      }
    }
    return result;
  }

  function weeklyRanking(form) {
    const temp = [];
    for (let i = 0; i < form.length; i++) {
      const result = [];
      result.push(
        <p key={i + "week"} className="weekly_w">
          {i + 1}주차
        </p>
      );
      for (let k = 0; k < form[i].length; k++) {
        if (form[i][k] === undefined) {
          result.push(<p key={k}> 공석 </p>);
        } else {
          result.push(
            <Row
              key={k}
              className="weekly"
              style={{
                display: "flex",
                flexDirection: "row",
                width: "120%",
              }}
            >
              <Col style={{ width: "40%" }}>{form[i][k].games}</Col>
              <Col style={{ width: "40%" }}>{form[i][k].rank}등 :</Col>
              <Col style={{ width: "40%" }}>{form[i][k].nick}</Col>
            </Row>
          );
        }
      }
      temp.push(<div key={i}>{result}</div>);
    }
    return temp;
  }

  return (
    <>
      <CommonSection title="Ranking" />
      {loading ? (
        <FadeLoader
          size={150}
          color={"#4512bc"}
          css={override}
          loading={loading}
        />
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
                        {rankingDB !== null
                          ? RankingListForm(rankingDB.snakeranker)
                          : false}
                        <br />
                        <li>TetrisGame</li>
                        <br />
                        {rankingDB !== null
                          ? RankingListForm(rankingDB.tetrisranker)
                          : false}
                        <br />
                        <li>2048Game</li>
                        <br />
                        {rankingDB !== null
                          ? RankingListForm(rankingDB.puzzleranker)
                          : false}
                        <br />
                        <li>MineGame</li>
                        <br />
                        {rankingDB !== null
                          ? RankingListForm(rankingDB.mineranker)
                          : false}
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
                  <Container className="my__rank">
                    <div className="sticky__box">
                      <Carousel>
                        {weekly !== null ? weeklyRanking(weekly) : false}
                      </Carousel>
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
                      <p>
                        {rankingDB !== null
                          ? rankingDB.snakeMyRanking === 0
                            ? "순위없음"
                            : rankingDB.snakeMyRanking + " 등"
                          : false}
                      </p>
                      <br />
                      <li>2048Game</li>
                      <br />
                      <p>
                        {rankingDB !== null
                          ? rankingDB.puzzleMyRanking === 0
                            ? "순위없음"
                            : rankingDB.puzzleMyRanking + " 등"
                          : false}
                      </p>
                      <br />
                      <li>TetrisGame</li>
                      <br />
                      <p>
                        {rankingDB !== null
                          ? rankingDB.tetrisMyRanking === 0
                            ? "순위없음"
                            : rankingDB.tetrisMyRanking + " 등"
                          : false}
                      </p>
                      <br />
                      <li>MineGame</li>
                      <br />
                      <p>
                        {rankingDB !== null
                          ? rankingDB.mineMyRanking === 0
                            ? "순위없음"
                            : rankingDB.mineMyRanking + " 등"
                          : false}
                      </p>
                    </ul>
                  </Container>
                </div>
              </div>
            </Col>
            <Col className="time__limit" lg="4" md="6" sm="6">
              <h4>Time Limit</h4>
              <Clock
                className="clock__box"
                timerDays={timerDays}
                timerHours={timerHours}
                timerMinutes={timerMinutes}
                timerSeconds={timerSeconds}
              />
              <button className="aat__token" href="/mypage">
                <Link to={`/mypage`}>Check your AAT Balance</Link>
              </button>
              <br />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Ranking;

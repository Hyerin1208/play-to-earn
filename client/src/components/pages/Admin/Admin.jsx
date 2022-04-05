import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import ReactLoaing from "react-loading";
import axios from "axios";
import { useSelector } from "react-redux";

import AdminInfo from "./AdminInfo";
import Accept from "./Accept";
import OwnerSellList from "./OwnerSellList";

import "./admin.css";

const Admin = () => {
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const account = useSelector((state) => state.AppState.account);

  // Claim부분
  const [snakeRank, setSnakeRank] = useState([]);
  const [puzzleRank, setPuzzleRank] = useState([]);
  const [tetrisRank, setTetrisRank] = useState([]);
  const [mineRank, setMineRank] = useState([]);
  const [weeks, setWeeks] = useState([]);

  const sendReward = async () => {
    await axios
      .post(`http://localhost:5000/ranking/reward`, {
        tetrisRank,
        puzzleRank,
        snakeRank,
        mineRank,
        address: account,
      })
      .then((res) => {
        console.log(res.data);
        alert("DB 전송 완료");
      });
  };

  useEffect(() => {
    axios
      .post(`http://localhost:5000/user/weeks`, { address: account })
      .then((res) => {
        const data = res.data;
        setWeeks(data.weeks);
      });

    axios
      .get(`http://localhost:5000/game/snake`)
      .then((response) => {
        const data = response.data;
        console.log(data);

        const snakeInfo = data.map((data, index) => {
          const form = {
            weeks: weeks,
            games: "snakeGame",
            rank: index + 1,
            address: data.address,
            balance: [1000, 600, 400],
          };
          return form;
        });
        setSnakeRank(snakeInfo);
      })
      .catch((error) => {
        setError(error);
      });

    axios
      .get(`http://localhost:5000/game/tetris`)
      .then((response) => {
        const data = response.data;
        console.log(data);

        const tetrisInfo = data.map((data, index) => {
          const form = {
            weeks: weeks,
            games: "tetrisGame",
            rank: index + 1,
            address: data.address,
            balance: [1000, 600, 400],
          };
          return form;
        });
        setTetrisRank(tetrisInfo);
      })
      .catch((error) => {
        setError(error);
      });

    axios
      .get(`http://localhost:5000/game/2048`)
      .then((response) => {
        const data = response.data;
        console.log(data);

        const puzzleInfo = data.map((data, index) => {
          const form = {
            weeks: weeks,
            games: "puzzleGame",
            rank: index + 1,
            address: data.address,
            balance: [1000, 600, 400],
          };
          return form;
        });
        setPuzzleRank(puzzleInfo);
      })
      .catch((error) => {
        setError(error);
      });

    axios
      .get(`http://localhost:5000/game/mine`)
      .then((response) => {
        const data = response.data;
        console.log(data);

        const mineInfo = data.map((data, index) => {
          const form = {
            weeks: weeks,
            games: "mineGame",
            rank: index + 1,
            address: data.address,
            balance: [1000, 600, 400],
          };
          return form;
        });
        setMineRank(mineInfo);
      })
      .catch((error) => {
        setError(error);
      });

    setLoading(null);
  }, []);

  if (Loading) {
    return (
      <div>
        잠시만 기다려 주세요
        <ReactLoaing type={"bars"} color={"purple"} height={600} width={375} />
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <Container
          style={{
            display: "flex",
            height: " 120vh",
            background:
              "linear-gradient(to bottom right, white 0%, # e6e4ff 70%)",
            borderRadius: "2rem",
            marginBottom: "480px",
          }}
        >
          <div className="admin__dash">
            <div className="sub__container">
              <div className="section1__one">
                <Col xs="4">
                  <AdminInfo />
                </Col>
                <Col xs="1">
                  <div type="button" onClick={sendReward}>
                    Send Reward
                  </div>
                </Col>
                <Col xs="8">
                  <Accept />
                </Col>
              </div>
              <Row>
                <div className="section2__two">
                  <Col>{/* <OwnerSellList /> */}</Col>
                </div>
              </Row>
            </div>
          </div>
        </Container>
      </React.Fragment>
    );
  }
};

export default Admin;

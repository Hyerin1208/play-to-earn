import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { utils } from "ethers";

import "./accept.css";
const Accept = () => {
  const [rankingDB, setRankingDB] = useState(null);
  const account = useSelector((state) => state.AppState.account);
  const networkid = useSelector((state) => state.AppState.networkid);
  const chainid = useSelector((state) => state.AppState.chainid);
  const TokenContract = useSelector(
    (state) => state.AppState.AmusementArcadeTokenContract
  );
  const TokenClaimContract = useSelector(
    (state) => state.AppState.TokenClaimContract
  );
  useEffect(async () => {
    if (account !== null) {
      await axios
        .post(`http://15.165.17.43:5000/game/ranking`, { address: account })
        .then(async (response) => {
          const data = await response.data;
          setRankingDB(data);
        });
    }
  }, [account]);

  async function checkApprove(address) {
    const result = await axios
      .post(`http://15.165.17.43:5000/game/getclaim`, { address: address })
      .then((res) => res.data.message);
    return await result;
  }

  async function setClaim(address, amount) {
    if (TokenClaimContract !== null) {
      if (chainid === 1337 ? false : networkid === chainid ? false : true)
        return alert("네트워크 아이디를 확인하세요");
      await TokenClaimContract.methods
        .setClaim(address, utils.parseEther(amount.toString()))
        .send({ from: account, gas: 3000000 })
        .then(() => {
          axios
            .post(`http://15.165.17.43:5000/game/setclaim`, {
              address: address,
              claim: true,
            })
            .then((res) => {
              if (res.data.message === "ok") {
                alert("승인 완료");
              } else {
                alert("에러확인");
              }
            });
        });
    } else {
      alert("컨트랙트 로드 실패");
    }
  }

  function changeCost(index) {
    switch (index) {
      case 0:
        return 2000;
      case 1:
        return 1000;
      case 2:
        return 500;
    }
  }

  function winnerTemplate(ranker) {
    if (rankingDB !== null) {
      const result = [];
      for (let i = 0; i < 3; i++) {
        result.push(
          <div className="winner__box" key={i}>
            <p>{ranker[i] !== undefined ? ranker[i].address : "순위없음"}</p>
            <button
              className="accept__btn"
              hidden={
                ranker[i] !== undefined
                  ? ranker[i].approve === true
                    ? true
                    : false
                  : false
              }
              onClick={async (e) => {
                if (rankingDB !== null && ranker[i] !== undefined) {
                  if ((await checkApprove(ranker[i].address)) === false) {
                    setClaim(ranker[i].address, changeCost(i)).then(() => {
                      e.target.setAttribute("hidden", "true");
                    });
                  } else {
                    alert("승인이 완료된 유저입니다.");
                    e.target.setAttribute("hidden", "true");
                  }
                }
              }}
            >
              signed
            </button>
          </div>
        );
      }
      return result;
    } else {
      <p>로딩중...</p>;
    }
  }

  return (
    <div className="admin__card">
      <div className="carousel__con">
        <Carousel itemsToShow={1}>
          <div className="winner__card" numbers="1">
            <div className="winner__content">
              <div className="winner__chart">{/* Snake */}</div>
              <div className="earing__text">
                <div className="token__mybox">Snake Game Winner</div>
                {rankingDB !== null ? (
                  winnerTemplate(rankingDB.snakeranker)
                ) : (
                  <p>로딩중...</p>
                )}
              </div>
            </div>
          </div>
          <div className="winner__card" numbers="2">
            <div className="winner__content">
              <div className="winner__chart">{/* Tetris */}</div>
              <div className="earing__text">
                <div className="token__mybox">Tetris Game Winner</div>
                {rankingDB !== null ? (
                  winnerTemplate(rankingDB.tetrisranker)
                ) : (
                  <p>로딩중...</p>
                )}
              </div>
            </div>
          </div>
          <div className="winner__card" numbers="3">
            <div className="winner__content">
              <div className="winner_chart">{/* 2048 */}</div>
              <div className="earing__text">
                <div className="token__mybox">2048 Game Winner</div>
                {rankingDB !== null ? (
                  winnerTemplate(rankingDB.puzzleranker)
                ) : (
                  <p>로딩중...</p>
                )}
              </div>
            </div>
          </div>

          <div className="winner__card" numbers="4">
            <div className="winner__content">
              <div className="winner__chart">{/* Minesweeper */}</div>
              <div className="earing__text">
                <div className="token__mybox">Minesweeper Game Winner</div>
                {rankingDB !== null ? (
                  winnerTemplate(rankingDB.mineranker)
                ) : (
                  <p>로딩중...</p>
                )}
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Accept;

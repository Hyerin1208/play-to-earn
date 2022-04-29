import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col } from "reactstrap";
import SnakeGame from "../../pages/SnakeGame/SnakeGame";
import TetrisGame from "../../pages/TetrisGame/Tetris";
import PuzzleGame from "../../pages/2048Game/2048Game";
import MineGame from "../../pages/MineGame/MineGame";
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";

import "./game-card.css";
import { useSelector } from "react-redux";

const GameCard = (props) => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #5900ff;
    width: 100%;
    height: 100%;
    background: #34343465;
  `;
  const [Loading, setLoading] = useState(false);
  const { id, title, imgUrl, text } = props.item;
  const [showModal, setShowModal] = useState(false);
  const isUser = useSelector((state) => state.AppState.isUser);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );
  const account = useSelector((state) => state.AppState.account);
  const Navigate = useNavigate();
  function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  }
  async function readytoplay() {
    if (CreateNFTContract !== null) {
      if (account === null) return alert("지갑 연결이 필요합니다.");
      if (isUser) {
        setLoading(true);
        const mybalance = await CreateNFTContract.methods
          .balanceOf(account)
          .call();
        if (mybalance !== 0) {
          sleep(2000);
          setLoading(false);
          setShowModal(true);
        } else {
          setLoading(false);
          alert("NFT가 있어야 참여할 수 있습니다.");
        }
      } else {
        setLoading(false);
        if (
          window.confirm(
            "회원가입이 필요한 서비스 입니다.\n 회원가입페이지로 이동하시겠습니까?"
          )
        ) {
          Navigate("/join/step1");
        }
      }
    }
  }

  function showGame(showModal) {
    if (showModal) {
      switch (id) {
        case "1":
          return <SnakeGame setShowModal={setShowModal}></SnakeGame>;
        case "2":
          return <TetrisGame setShowModal={setShowModal}></TetrisGame>;
        case "3":
          return <PuzzleGame setShowModal={setShowModal}></PuzzleGame>;
        case "4":
          return <MineGame setShowModal={setShowModal}></MineGame>;

        default:
          console.log("default");
          break;
      }
    } else {
      console.log("아직 안열림");
    }
  }

  return (
    <>
      <div className="gameCard__wrapper">
        {Loading ? (
          <div
            className={Loading ? "parentDisable" : ""}
            width="100%"
            height="100%"
          >
            <div className="overlay-box">
              <FadeLoader
                size={150}
                color={"#ffffff"}
                css={override}
                loading={Loading}
                z-index={"1"}
                text="Loading your content..."
              />
            </div>
          </div>
        ) : (
          false
        )}
        <div className="gamecard__img">
          <img src={imgUrl} alt="" />
        </div>

        <div className="card__body">
          <Col>
            <div className="single__game__card">
              <h3 className="gameCard__title">{title}</h3>
              <p className="gameCard__text">{text}</p>

              <button
                className="gamecard__btn"
                onClick={() => {
                  readytoplay();
                }}
              >
                Go to this game
              </button>
              {showGame(showModal)}
            </div>
          </Col>
        </div>
      </div>
    </>
  );
};

export default GameCard;

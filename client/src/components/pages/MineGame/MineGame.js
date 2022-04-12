import InfoWrapper from "./InfoWrapper";
import Board from "./Board";
import Setting from "./Setting";
import { expandOpenedCell, getNextCellCode, initBoard } from "./minesweeper";
import {
  CODES,
  GAMESTATE,
  MIN_HEIGHT,
  MIN_MINES,
  MIN_WIDTH,
} from "./constants";
import { useEffect, useState } from "react";
import "./MineGame.css";

import axios from "axios";
import { useSelector } from "react-redux";
import ReactLoaing from "react-loading";

function MineGame({ setShowModal }) {
  let [gameAttr, setGameAttr] = useState({
    width: MIN_WIDTH,
    height: MIN_HEIGHT,
    mines: MIN_MINES,
  });
  let [boardData, setBoardData] = useState(
    initBoard(MIN_WIDTH, MIN_HEIGHT, MIN_MINES)
  );
  let [openedCount, setOpenedCount] = useState(0);
  let [gameState, setGameState] = useState(GAMESTATE.READY);
  let [flagCount, setFlagCount] = useState(0);
  let [mineCount, setMineCount] = useState(MIN_MINES);
  let [runtime, setRuntime] = useState(0);
  let [showSet, setShowSet] = useState(false);

  const account = useSelector((state) => state.AppState.account);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );
  const [Loading, setLoading] = useState(true);
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    mynftlists();
    setLoading(false);
  }, [CreateNFTContract]);

  // 내 nft 리스트
  async function mynftlists() {
    const lists = await CreateNFTContract.methods
      .MyNFTlists()
      .call({ from: account }, (error) => {
        if (!error) {
          console.log("send ok");
        } else {
          console.log(error);
        }
      });
    setMyList(lists);
  }

  const sendPoint = async () => {
    const point = runtime;
    function multiply(point) {
      let rareD;
      if (myList.filter((v) => v.rare === "5").length >= 3) {
        rareD = 3;
      } else if (myList.filter((v) => v.rare === "4").length >= 3) {
        rareD = 2.5;
      } else if (myList.filter((v) => v.rare === "3").length >= 3) {
        rareD = 2;
      } else if (myList.filter((v) => v.rare === "2").length >= 3) {
        rareD = 1.5;
      } else {
        rareD = 1;
      }
      let starD;
      if (myList.filter((v) => v.star === "5").length >= 3) {
        starD = 3;
      } else if (myList.filter((v) => v.star === "4").length >= 3) {
        starD = 2.5;
      } else if (myList.filter((v) => v.star === "3").length >= 3) {
        starD = 2;
      } else if (myList.filter((v) => v.star === "2").length >= 3) {
        starD = 1.5;
      } else if (myList.filter((v) => v.star === "1").length >= 3) {
        rareD = 1.2;
      } else {
        starD = 1;
      }
      console.log("point : " + point);
      console.log("rareD : " + rareD);
      console.log("starD : " + starD);
      return point * (starD * rareD);
    }
    await axios
      .post(`http://localhost:5000/game/mine`, {
        runtime: point,
        account: account,
      })
      .then((res) => {
        console.log(res.data);
        alert("점수 등록 완료");
      });
  };

  const handleRightClick = (e, i, j) => {
    e.preventDefault();
    if (gameState === GAMESTATE.WIN || gameState === GAMESTATE.LOSE) return;
    if (gameState === GAMESTATE.READY) setGameState(GAMESTATE.RUN);
    let cur_boardData = boardData.slice();
    cur_boardData[i][j] = getNextCellCode(cur_boardData[i][j]);
    if (
      cur_boardData[i][j] === CODES.MINE_FLAG ||
      cur_boardData[i][j] === CODES.FLAG
    ) {
      setFlagCount((prev) => prev + 1);
      if (cur_boardData[i][j] === CODES.MINE_FLAG)
        setMineCount((prev) => prev - 1);
    } else if (
      cur_boardData[i][j] === CODES.MINE_QUESTION ||
      cur_boardData[i][j] === CODES.QUESTION
    ) {
      setFlagCount((prev) => prev - 1);
      if (cur_boardData[i][j] === CODES.MINE_QUESTION)
        setMineCount((prev) => prev + 1);
    }
    setBoardData(cur_boardData);
  };

  const handleLeftClick = (i, j) => {
    if (gameState === GAMESTATE.WIN || gameState === GAMESTATE.LOSE) return;
    let cur_boardData = boardData.slice();

    if (gameState === GAMESTATE.READY) {
      while (cur_boardData[i][j] == CODES.MINE) {
        cur_boardData = initBoard(
          gameAttr.width,
          gameAttr.height,
          gameAttr.mines
        );
      }
      setGameState(GAMESTATE.RUN);
    }

    if (cur_boardData[i][j] === CODES.MINE) {
      setGameState(GAMESTATE.LOSE);
      return;
    }
    let r = expandOpenedCell(cur_boardData, j, i);
    setOpenedCount((prev) => prev + r.openedCellCount);
    setBoardData(cur_boardData);
  };
  const handleRestart = () => {
    setBoardData(initBoard(gameAttr.width, gameAttr.height, gameAttr.mines));
    setOpenedCount(0);
    setGameState(GAMESTATE.READY);
    setFlagCount(0);
    setMineCount(gameAttr.mines);
    setRuntime(0);
  };

  const handleShowSet = () => {
    setShowSet(true);
  };

  const handleSet = (attr) => {
    setShowSet(false);
    setGameAttr(attr);
  };

  const isWin = (open, mine) => {
    if (
      mine === 0 &&
      open === gameAttr.width * gameAttr.height - gameAttr.mines
    ) {
      setGameState(GAMESTATE.WIN);
      sendPoint();
      console.log("WIN!");
    }
  };

  useEffect(() => {
    isWin(openedCount, mineCount);
  }, [openedCount, mineCount]);

  useEffect(() => {
    let timer = null;
    if (gameState === GAMESTATE.RUN)
      timer = setInterval(() => {
        setRuntime((prev) => prev + 1);
      }, 1000);
    else clearInterval(timer);

    return () => {
      clearInterval(timer);
    };
  }, [gameState]);

  useEffect(() => {
    handleRestart();
  }, [gameAttr]);

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  if (Loading) {
    return (
      <div>
        잠시만 기다려 주세요
        <ReactLoaing type={"bars"} color={"purple"} height={375} width={375} />
      </div>
    );
  } else {
    return (
      <>
        <div className="game_modal__wrapper">
          <div className="game_single__modal">
            <span className="game_close__modal">
              <i
                className="ri-close-line"
                onClick={() => setShowModal(false)}
              ></i>
            </span>
            <div className="box">
              <main>
                <InfoWrapper
                  mines={gameAttr.mines}
                  leftMines={gameAttr.mines - flagCount}
                  gameState={gameState}
                  handleRestart={handleRestart}
                  runtime={runtime}
                  handleShowSet={handleShowSet}
                />
                <Board
                  boardData={boardData}
                  handleLeftClick={handleLeftClick}
                  handleRightClick={handleRightClick}
                  gameState={gameState}
                />
              </main>
            </div>
            <Setting show={showSet} handleSet={handleSet} />
          </div>
        </div>
      </>
    );
  }
}

export default MineGame;

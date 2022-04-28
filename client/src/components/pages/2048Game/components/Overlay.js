import { Button, Sutton, Vutton } from "./Button";
import { OverlayStyle } from "./styles/OverlayStyle";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactLoaing from "react-loading";

export const Overlay = ({ handleReset, score }) => {
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

  function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  }

  // 내 nft 리스트
  async function mynftlists() {
    const lists = await CreateNFTContract.methods
      .MyNFTlists()
      .call({ from: account }, (error) => {
        if (!error) {
          sleep(2000);
          console.log("send ok");
        } else {
          console.log(error);
        }
      });
    setMyList(lists);
  }

  const sendPoint = async () => {
    const point = score;

    function test() {
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
      return rareD;
    }

    function jest() {
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
        starD = 1.2;
      } else {
        starD = 1;
      }
      return starD;
    }

    const puzzleData = await axios.post(`http://localhost:5000/game/2048`, {
      score: point * (test() * jest()),
      account: account,
    });

    if (puzzleData.data.bool === true) {
      alert(
        "Score(" +
          point +
          ")점" +
          " x ( " +
          "Rare(" +
          test() +
          ")" +
          " x " +
          "Star(" +
          jest() +
          ") ) = " +
          "Result(" +
          point * (test() * jest()) +
          ")점" +
          "\n" +
          puzzleData.data.message
      );
      window.location.href = "/game";
    } else if (puzzleData.data.bool === false) {
      alert(puzzleData.data.message);
    }
  };

  if (Loading) {
    return (
      <div>
        잠시만 기다려 주세요
        <ReactLoaing type={"bars"} color={"purple"} height={375} width={375} />
      </div>
    );
  } else {
    return (
      <OverlayStyle>
        <h1>Game Over!</h1>
        <p>
          Score: <span>{score}</span>
        </p>
        <Button onClick={handleReset} />
        <br />
        <Sutton onClick={sendPoint} />
      </OverlayStyle>
    );
  }
};

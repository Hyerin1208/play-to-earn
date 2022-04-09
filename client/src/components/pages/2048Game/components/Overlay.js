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

  const [tokenId, setTokenId] = useState([]);

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
    setTokenId(
      await lists.map((v, i) => {
        return v.tokenId;
      })
    );
  }

  const sendPoint = async () => {
    console.log(score);
    console.log(account);

    await axios
      .post(`http://localhost:5000/game/2048`, { score, account, tokenId })
      .then((res) => {
        console.log(res.data);
        alert("점수 등록 완료");
      });
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

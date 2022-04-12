import { Button, Sutton, Vutton } from "./Button";
import { OverlayStyle } from "./styles/OverlayStyle";
import axios from "axios";
import { useSelector } from "react-redux";

export const Overlay = ({ handleReset, score }) => {
  const account = useSelector((state) => state.AppState.account);

  const sendPoint = async () => {
    console.log(score);
    console.log(account);

    await axios
      .post(`http://localhost:5000/game/2048`, { score, account })
      .then((res) => {
        console.log(res.data);
        alert("점수 등록 완료");
      });
  };

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
};

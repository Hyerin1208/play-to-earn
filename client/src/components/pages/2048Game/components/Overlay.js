import { Button} from "./Button";
import { OverlayStyle } from "./styles/OverlayStyle";
import axios from "axios";

export const Overlay = ({ handleReset, score }) => {
  const sendPoint = async () => {
    console.log(score);
    await axios.post(`http://localhost:5000/sendPoint`).then((res) => {
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
      <button type="submit" onClick={sendPoint}>점수 등록</button>
    </OverlayStyle>
  );
};

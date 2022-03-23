import { Button, Sutton, Vutton } from "./Button";
import { OverlayStyle } from "./styles/OverlayStyle";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import { getWeb3 } from "../../../../redux/actions/index";

export const Overlay = ({ handleReset, score }) => {
  // const dispatch = useDispatch();
  const account = useSelector((state) => state.AppState.account);

  const sendPoint = async () => {
    console.log(score);
    console.log(account);
    await axios
      .post(`http://localhost:5000/2048`, { score, account })
      .then((res) => {
        console.log(res.data);
        alert("점수 등록 완료");
      });
  };

  const updatePoint = async () => {
    console.log(score);
    console.log(account);
    await axios
      .put(`http://localhost:5000/2048`, { score, account })
      .then((res) => {
        console.log(res.data);
        alert("점수 갱신 완료");
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
      <br />
      <Vutton onClick={updatePoint} />
      <br />
      {/* <button type="submit" onClick={sendPoint}>
        점수 등록
      </button>
      <br />
      <button type="submit" onClick={updatePoint}>
        점수 갱신
      </button> */}
    </OverlayStyle>
  );
};

import React from "react";
import "../css/Status.css";

export default function Status(props) {
  // const sendPoint = async () => {
  //   // const account = useSelector((state) => state.AppState.account);
  //   // const account = this.state.AppState.account;
  //   const bestTime = props.time;
  //   console.log(bestTime);
  //   console.log(account);
  //   await axios.post(`http://localhost:5000/mine`, { bestTime }).then((res) => {
  //     console.log(res.data);
  //     alert("점수 등록 완료");
  //   });
  // };
  return (
    <div className="status">
      <div className="lcd minesLeft">{props.minesLeft}</div>
      <button className="restart" onClick={props.onClick}>
        {props.buttonStatus}
      </button>
      <div className="lcd timer">{props.time}</div>
      {/* <button type="submit" onClick={sendPoint}>
        점수 등록
      </button> */}
    </div>
  );
}

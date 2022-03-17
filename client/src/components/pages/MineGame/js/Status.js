import React from 'react';
import '../css/Status.css';
import axios from 'axios';

export default function Status(props) {
  const sendTime = async () => {
    console.log(props.time);
    await axios.post(`http://localhost:5000/sendTime`).then((res) => {
      console.log(res.data);
      alert("점수 등록 완료");
    });
  };
  
  return (
    <div className="status">
      <div className="lcd minesLeft">{props.minesLeft}</div>
      <button className="restart" onClick={props.onClick}>
        {props.buttonStatus}
      </button>
      <div className="lcd timer">{props.time}</div>
      {/* <button type='submit' onChange={sendTime(props.time)}>시간등록</button> */}
    </div>
  );
};

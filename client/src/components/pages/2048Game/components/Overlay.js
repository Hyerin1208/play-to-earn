import { Button } from "./Button";
import { OverlayStyle } from "./styles/OverlayStyle";
import axios from "axios";

export const Overlay = ({ handleReset, score }) => {
  // const API = axios.create({
  //   baseURL: "http://localhost:5000",
  //   headers:{
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*"
  //   },
  //   withCredentials:true
  // })
  
  const sendPoint = async () => {
    console.log(score);
    await axios.post(`http://localhost:5000/api/sendPoint`).then((res) => {
      res.send(JSON.stringify(score));
      console.log(res.data);
      alert("점수 등록 완료");
    });
  };

  // const sendPoint = (score) => {
  //   const data = new FormData();
  //   data.append("data", score);
  //   fetch("http://localhost:5000/sendPoint", {
  //     method: "post",
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setScore(data.url.toString());
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <OverlayStyle>
      <h1>Game Over!</h1>
      <p>
        Score: <span>{score}</span>
      </p>
      <Button onClick={handleReset} />
      <br />
      <button type="submit" onClick={sendPoint}>
        점수 등록
      </button>
    </OverlayStyle>
  );
};

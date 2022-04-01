import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import "./my-ranking.css";

const MyRanking = () => {
  // const [ranking, setRanking] = useState("7");
  const account = useSelector((state) => state.AppState.account);

  const [loading, setLoading] = useState(true);
  const [reward, setReward] = useState([]);
  const [balance, setBalance] = useState(0);
  const [claim, setClaim] = useState(true);

  const sendReward = async () => {
    await axios
      .post(`http://localhost:5000/ranking`, { balance, account, claim })
      .then((res) => {
        console.log(res.data);
        alert("토큰 클레임 완료");
      });
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="myrank__card">
      {loading ? (
        <strong> loading... </strong>
      ) : (
        <div className="myrank__content">
          <div className="myrank__chart">
            <i className="ri-hand-coin-line"></i>
          </div>
          <div className="myrank__text">
            <div className="rank__mybox">
              {/* {ranking} 위<span>In top 0.342%</span> */}
            </div>
            <button className="get__token" type="submit" onClick={sendReward}>
              Get My Token
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRanking;

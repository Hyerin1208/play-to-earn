import React, { useEffect, useState } from "react";
import "./earning.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Earnings = () => {
  const [token, setToken] = useState("");
  const [totalAAK, setTotalAAK] = useState("");
  const TokenClaimContract = useSelector(
    (state) => state.AppState.TokenClaimContract
  );
  const account = useSelector((state) => state.AppState.account);

  useEffect(async () => {
    if (account !== null) {
      mybalance();
    }
  }, [account]);

  const mybalance = async () => {
    if (TokenClaimContract !== null) {
      const result = await TokenClaimContract.methods
        .mybalance()
        .call({ from: account });
      return setTotalAAK(result);
    } else {
      alert("컨트랙트 로드 실패!!\n네트워크를 확인하세요");
    }
  };
  return (
    <div className="earning__card">
      <div className="card__content">
        <div className="earning__chart">
          <i className="ri-copper-diamond-line"></i>
        </div>
        <div className="earing__text">
          <div className="token__mybox">{totalAAK} AAT</div>
          <div className="token__mydesc">Total Volume</div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;

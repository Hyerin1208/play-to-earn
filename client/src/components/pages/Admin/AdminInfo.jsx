import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { useSelector } from "react-redux";
import { utils } from "ethers";

import "./admin-info.css";

const AdminInfo = () => {
  const Mybalance = useSelector((state) => state.AppState.Mybalance);
  const TokenClaimContract = useSelector(
    (state) => state.AppState.TokenClaimContract
  );
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );
  const AmusementArcadeTokenContract = useSelector(
    (state) => state.AppState.AmusementArcadeTokenContract
  );
  const [amount, setAmount] = useState(null);
  const [totalNFT, setTotalNFT] = useState(null);
  const [sendamount, setSendamount] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);

  useEffect(async () => {
    if (TokenClaimContract !== null) {
      const contractbalance = await TokenClaimContract.methods
        .contractbalance()
        .call();
      setAmount(utils.formatUnits(contractbalance, 18));
    }
  }, [TokenClaimContract]);

  useEffect(async () => {
    if (AmusementArcadeTokenContract !== null) {
      const totalSupply = await AmusementArcadeTokenContract.methods
        .totalSupply()
        .call();
      setTotalSupply(utils.formatUnits(totalSupply, 18));
    }
  }, [AmusementArcadeTokenContract]);

  useEffect(async () => {
    await axios
      .post("http://127.0.0.1:5000/ranking/sendbalance")
      .then(async (res) => {
        const arry = await res.data.totalclaim;
        const result = arry.reduce((sum, element) => {
          return sum + element.balance;
        }, 0);
        setSendamount(result);
      });
  }, []);

  useEffect(async () => {
    if (CreateNFTContract !== null) {
      const lists = await CreateNFTContract.methods.totalNFTs().call();
      setTotalNFT(lists);
    }
  }, [totalNFT, CreateNFTContract]);

  return (
    <div className="InfoA__card">
      <div className="carousel0__box">
        <Carousel itemsToShow={1}>
          <div className="carousel__card" numbers="1">
            <div className="card__content">
              <div className="InfoA__chart">
                <i className="ri-bar-chart-box-line"></i>
              </div>
              <div className="earing__text">
                <div className="token__mybox">{totalSupply}token</div>
                <div className="token__mydesc">발행한 토큰수</div>
              </div>
            </div>
          </div>
          <div className="carousel__card" numbers="2">
            <div className="card__content">
              <div className="InfoA__chart">
                <i className="ri-bar-chart-2-line"></i>
              </div>
              <div className="earing__text">
                <div className="token__mybox">{amount} AAT</div>
                <div className="token__mydesc">미지급된 토큰양</div>
              </div>
            </div>
          </div>
          <div className="carousel__card" numbers="3">
            <div className="card__content">
              <div className="InfoA__chart">
                <i className="ri-line-chart-line"></i>
              </div>
              <div className="earing__text">
                <div className="token__mybox">{sendamount} AAT</div>
                <div className="token__mydesc">지급된 토큰양</div>
              </div>
            </div>
          </div>
          <div className="carousel__card" numbers="4">
            <div className="card__content">
              <div className="InfoA__chart">
                <i className="ri-pie-chart-box-line"></i>
              </div>
              <div className="earing__text">
                <div className="token__mybox">{totalNFT}</div>
                <div className="token__mydesc">발행한 nfts 수 </div>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default AdminInfo;

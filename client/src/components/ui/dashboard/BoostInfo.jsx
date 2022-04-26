import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./BoostInfo.css";

const BoostInfo = ({ setShowModal }) => {
  const [Loading, setLoading] = useState(true);
  const [myList, setMyList] = useState([]);

  const account = useSelector((state) => state.AppState.account);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

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
    setMyList(lists);
  }

  useEffect(() => {
    mynftlists();
    setLoading(false);
  }, [CreateNFTContract]);

  function test() {
    let rareD;
    if (myList.filter((v) => v.rare === "5").length >= 3) {
      rareD = 3;
    } else if (myList.filter((v) => v.rare === "4").length >= 3) {
      rareD = 2.5;
    } else if (myList.filter((v) => v.rare === "3").length >= 3) {
      rareD = 2;
    } else if (myList.filter((v) => v.rare === "2").length >= 3) {
      rareD = 1.5;
    } else {
      rareD = 1;
    }
    return rareD;
  }

  function jest() {
    let starD;
    if (myList.filter((v) => v.star === "5").length >= 3) {
      starD = 3;
    } else if (myList.filter((v) => v.star === "4").length >= 3) {
      starD = 2.5;
    } else if (myList.filter((v) => v.star === "3").length >= 3) {
      starD = 2;
    } else if (myList.filter((v) => v.star === "2").length >= 3) {
      starD = 1.5;
    } else if (myList.filter((v) => v.star === "1").length >= 3) {
      starD = 1.2;
    } else {
      starD = 1;
    }
    return starD;
  }

  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h2 className="text-center text-light">The Rules of Game Boost</h2>
        <div className="reward__content glow">
          <div className="single__rewardBlank">
            <h3>같은 RARE, STAR 3장 이상 보유시</h3>
          </div>
          <div className="single__rewardBlank">
            <h3>BOOST = SCORE x ( RARE x STAR )</h3>
          </div>
          <div className="single__rewardBlank">
            <h3>
              RARE x {test()} / STAR x {jest()} 적용됨
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoostInfo;

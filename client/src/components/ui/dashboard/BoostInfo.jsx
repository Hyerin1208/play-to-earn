import React, { useEffect } from "react";
import "./BoostInfo.css";

const BoostInfo = ({ setShowModal }) => {
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

  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h2 className="text-center text-light">Boost Info</h2>
        <div className="reward__content glow">
          <div className="single__rewardBlank">
            <h3>
              RARE와 STAR 등급을 진화시키세요
            </h3>
          </div>
          <div className="single__rewardBlank">
            <h3>
              뭐라 쓸지 고민중
            </h3>
          </div>
          <div className="single__rewardBlank">
            <h3>
              우주멋진 성현
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoostInfo;

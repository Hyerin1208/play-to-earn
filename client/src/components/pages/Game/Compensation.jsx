import React, { useEffect } from "react";
import "./compensation.css";

const Compensation = ({ setShowModal }) => {
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
        <h2 className="text-center text-light">Weekly Bonus</h2>
        <div className="reward__content glow">
          <div className="single__rewardBlank">
            <h3>
              <i className="ri-vip-diamond-fill"></i>1등 &nbsp;&nbsp;&nbsp;1000
            </h3>
          </div>
          <div className="single__rewardBlank">
            <h3>
              <i className="ri-vip-diamond-fill"></i>2등 &nbsp;&nbsp;&nbsp;600
            </h3>
          </div>
          <div className="single__rewardBlank">
            <h3>
              <i className="ri-vip-diamond-fill"></i>3등 &nbsp;&nbsp;&nbsp;400
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compensation;

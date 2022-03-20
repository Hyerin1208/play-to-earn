import React from "react";
import axios from "axios";

import "./compensation.css";

const Compensation = ({ setShowModal }) => {
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
              <i className="ri-vip-diamond-fill"></i>1등
            </h3>
          </div>
          <div className="single__rewardBlank">
            <h3>
              <i className="ri-vip-diamond-fill"></i>2등
            </h3>
          </div>
          <div className="single__rewardBlank">
            <h3>
              <i className="ri-vip-diamond-fill"></i>3등
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compensation;

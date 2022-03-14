import React from "react";

import "./compensation.css";

const Compensation = ({ setShowModal }) => {
  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h3 className="text-center text-light">랭킹별 보상 리스트</h3>
      </div>
    </div>
  );
};

export default Compensation;

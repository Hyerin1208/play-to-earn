import React from "react";

import "./my-ranking.css";

const myRanking = ({ setShowModal }) => {
  return (
    <div className="rank_wrapper">
      <div className="single_modal">
        <span className="close_modal">
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h6 className="text-center text-light">My Ranking</h6>
        <p className="text-center text-light">Buy. Sell. Collect.</p>

        <div className="box__rank mb-4">
          <div className="rank__list"></div>
        </div>
      </div>
    </div>
  );
};

export default myRanking;

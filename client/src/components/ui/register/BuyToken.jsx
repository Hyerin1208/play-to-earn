import React from "react";
import { Link } from "react-router-dom";

import "./buy-token.css";

const BuyToken = () => {
  return (
    <div>
      Second Step
      <div className="btn__container">
        <Link to="/join/step1">Back</Link>
        <Link to="/join/step3">Next</Link>
      </div>
    </div>
  );
};

export default BuyToken;

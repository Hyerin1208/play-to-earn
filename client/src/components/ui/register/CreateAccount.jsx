import React from "react";
import { Link } from "react-router-dom";

import "./create-account.css";

const createAccount = () => {
  return (
    <div>
      Third Step
      <div className="btn__container">
        <Link to="/join/step2">Back</Link>
        <Link to="/join/step4">Next</Link>
      </div>
    </div>
  );
};

export default createAccount;

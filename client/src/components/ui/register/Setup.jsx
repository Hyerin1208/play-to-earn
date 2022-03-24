import React from "react";
import { Link } from "react-router-dom";

import "./setup.css";

const Setup = () => {
  return (
    <div>
      Fourth Step
      <div className="btn__container">
        <Link to="/join/step3">Back</Link>
      </div>
    </div>
  );
};

export default Setup;

import React from "react";
import { Link } from "react-router-dom";

import "./free-item.css";

const FreeItem = () => {
  return (
    <div>
      First Step
      <div className="btn__container">
        <Link to="/join/step2">Next</Link>
      </div>
    </div>
  );
};

export default FreeItem;

import React, { useState } from "react";

import "./my-likes.css";

const MyLikes = () => {
  const [Liked, setLiked] = useState("12");
  return (
    <div className="myrank__card">
      <div className="myrank__content">
        <div className="myrank__chart">
          <i className="ri-thumb-up-line"></i>
        </div>
        <div className="myrank__text">
          <div className="rank__mybox">Total {Liked} likes</div>
          <span>Content You Liked</span>
        </div>
      </div>
    </div>
  );
};

export default MyLikes;

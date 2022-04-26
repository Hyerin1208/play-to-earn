import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

import "./my-likes.css";

const MyLikes = () => {
  const [Liked, setLiked] = useState("");
  const account = useSelector((state) => state.AppState.account);

  const getLike = async () => {
    await axios
      .post(`http://15.165.17.43:5000/nfts/likes`, {
        account: account,
      })
      .then((res) => {
        setLiked(res.data.like);
      });
  };

  useEffect(async () => {
    if (account === null) {
      return;
    } else {
      await getLike();
    }
  }, [account]);

  return (
    <div className="myrank__card">
      <div className="myrank__content">
        <div className="myrank__chart">
          <i className="ri-thumb-up-line"></i>
        </div>
        <div className="myrank__text">
          <div className="rank__mybox2">Total {Liked} likes</div>
          {/* <button onClick={() => getLike()}>total</button> */}
          <span>Content You Liked</span>
        </div>
      </div>
    </div>
  );
};

export default MyLikes;

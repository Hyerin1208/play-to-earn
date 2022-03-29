import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./select-card.css";

const SelectCard = (props) => {
  console.log(props.item.image);
  return (
    <div>
      <div className="select__nft__card">
        <label className="select__nftLabel">
          <div className="front__card">
            <div className="select__nft__img">
              <img src={props.item.image} alt="" />
            </div>
            <div className="select__nft__content">
              <h5 className="select__nft__title">{props.item.name}</h5>
              <div className="select__nft__desc">
                <p>{props.item.description}</p>
              </div>

              {/* <button className="pick__nft" onClick={btn}>
              Pick Me
            </button> */}
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default SelectCard;

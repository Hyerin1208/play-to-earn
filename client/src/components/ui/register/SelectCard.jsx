import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./select-card.css";

const SelectCard = (props) => {
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
              <div className="select__nft__info">
                <input className="nick_box" />
                <input className="email_box" />
              </div>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default SelectCard;

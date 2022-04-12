import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./select-card.css";

const SelectCard = (props) => {
  // console.log(props);
  return (
    <div>
      <div className="select__nft__card">
        <label className="select__nftLabel">
          <div className="front__card">
            <div className="select__nft__img">
              <img src={props.item.form.image} alt="" />
            </div>
            <div className="select__nft__content">
              <h5 className="select__nft__title">{props.item.form.name}</h5>
              <div className="select__nft__desc">
                <p>{props.item.form.description}</p>
              </div>
              <div className="select__nft__info">
                <div className="nick_box">{props.item.form.nick}</div>
                <div className="email_box">{props.item.form.email}</div>
                {/* <input
                  className="email_box"
                  readOnly
                  value={props.item.form.email}
                ></input> */}
              </div>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default SelectCard;

import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./free-item.css";

const FreeCard = (props) => {
  const { title, imgUrl, desc } = props.item;
  const { checkItem, setCheckItem } = props.check;

  const [checked, setChecked] = useState(false);

  //  const onChange = (e) => {
  //    const { value, index, type, checked } = e.target;
  //    setChecked((state) => ({
  //      ...state,
  //      [index]: type === "checkbox" ? checked : value,
  //    }));
  //  };

  function checkOnlyOne(element) {
    const checkboxes = document.getElementsByClassName("item__choice");

    checkboxes.forEach((cb) => {
      cb.checked = false;
    });

    element.checked = true;
  }

  function btn() {
    alert("해당 NFT가 발급 되었습니다");
    setCheckItem(props.item.id);
  }

  return (
    <div className="free__nft__card">
      <label className="free__nftLabel">
        <input
          className="item__choice"
          type="checkbox"
          checked={
            parseInt(checkItem) === parseInt(props.item.id) ? true : false
          }
          onClick={() => setCheckItem(props.item.id)}
          value={props.item.id}
          //   value={(e) => e.target}
        />
        <div className="front__card">
          <div className="free__nft__img">
            <img src={imgUrl} alt="" />
          </div>
          <div className="free__nft__content">
            <h5 className="free__nft__title">{title}</h5>
            <div className="free__nft__desc">
              <p>{desc}</p>
            </div>
            <button
              className="pick__nft"
              onClick={btn}
              checked={
                parseInt(checkItem) === parseInt(props.item.id) ? true : false
              }
            >
              Pick Me
            </button>
          </div>
        </div>
      </label>
    </div>
  );
};

export default FreeCard;

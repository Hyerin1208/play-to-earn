import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./free-item.css";

const FreeCard = (props) => {
  const { title, imgUrl, desc } = props.item;

  const [bChecked, setChecked] = useState(false);

  //   const checkHandler = ({ target }) => {
  //     setChecked(!bChecked);
  //     checkedItemHandler(issue.id, target.checked);
  //   };

  return (
    <div className="free__nft__card">
      <label className="free__nftLabel">
        <input
          type="checkbox"
          checked={bChecked}
          //   onChange={(e) => checkHandler(e)}
        />
        <div class="front__card">
          <div className="free__nft__img">
            <img src={imgUrl} alt="" />
          </div>
          <div className="free__nft__content">
            <h5 className="free__nft__title">{title}</h5>
            <div className="free__nft__desc">
              <p>{desc}</p>
            </div>
            <button class="pick__nft">Pick Me</button>
          </div>
        </div>
      </label>
    </div>
  );
};

export default FreeCard;

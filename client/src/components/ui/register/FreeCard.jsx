import React from "react";

import "./free-item.css";
import { useDispatch } from "react-redux";
import { setNfts } from "../../../redux/actions/index";

const FreeCard = (props) => {
  const { title, imgUrl, desc } = props.item;
  const { checkItem, setCheckItem } = props.check;

  const dispatch = useDispatch();

  async function btn(id) {
    setCheckItem(id);
    dispatch(
      setNfts({
        name: title,
        description: desc,
        image: imgUrl,
      })
    );

    setCheckItem(props.item.id);
  }

  return (
    <div className="free__nft__card">
      <label className="free__nftLabel">
        <input
          className="item__choice"
          type="checkbox"
          readOnly
          checked={
            parseInt(checkItem) === parseInt(props.item.id) ? true : false
          }
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
            <button className="pick__nft" onClick={() => btn(props.item.id)}>
              Pick Me
            </button>
          </div>
        </div>
      </label>
    </div>
  );
};

export default FreeCard;

import React, { useState } from "react";
// import {
//   useSpring,
//   animated,
//   config,
//   useChain,
//   useSpringRef,
// } from "react-spring";

import "./free-item.css";
import { useSelector, useDispatch } from "react-redux";
import { updateLists, setNfts } from "../../../redux/actions/index";
import { create as ipfsHttpClient } from "ipfs-http-client";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
const FreeCard = (props) => {
    const { title, imgUrl, desc } = props.item;
    const { checkItem, setCheckItem } = props.check;

    // const checkboxAnimationRef = useSpringRef();
    // const checkboxAnimationStyle = useSpring({
    //   backgroundColor: checkItem ? "#808" : "#fff",
    //   borderColor: checkItem ? "#808" : "#ddd",
    //   config: config.gentle,
    //   ref: checkboxAnimationRef,
    // });

    // const [checkmarkLength, setCheckmarkLength] = useState(null);

    // const checkmarkAnimationRef = useSpringRef();
    // const checkmarkAnimationStyle = useSpring({
    //   x: checkItem ? 0 : checkmarkLength,
    //   config: config.gentle,
    //   ref: checkmarkAnimationRef,
    // });

    // useChain(
    //   checkItem
    //     ? [checkboxAnimationRef, checkmarkAnimationRef]
    //     : [checkmarkAnimationRef, checkboxAnimationRef],
    //   [0, 0.1]
    // );

    // const { title, imgUrl, desc } = nfts[0];

    const Account = useSelector((state) => state.AppState.account);
    const CreateNFTContract = useSelector((state) => state.AppState.CreateNFTContract);
    const dispatch = useDispatch();

    async function btn() {
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
                    checked={parseInt(checkItem) === parseInt(props.item.id) ? true : false}
                    onChange={() => setCheckItem(props.item.id)}
                    value={props.item.id}
                    //   value={(e) => e.target}
                />

                {/* <animated.svg
          style={checkboxAnimationStyle}
          className={`checkbox ${checkItem ? "checkbox--active" : ""}`}
          aria-hidden="true"
          viewBox="0 0 15 11"
          fill="none"
        >
          <animated.path
            d="M1 4.5L5 9L14 1"
            strokeWidth="2"
            stroke="#fff"
            ref={(ref) => {
              if (ref) {
                setCheckmarkLength(ref.getTotalLength());
              }
            }}
            strokeDasharray={checkmarkLength}
            strokeDashoffset={checkmarkAnimationStyle.x}
          />
        </animated.svg> */}

                <div className="front__card">
                    <div className="free__nft__img">
                        <img src={imgUrl} alt="" />
                    </div>
                    <div className="free__nft__content">
                        <h5 className="free__nft__title">{title}</h5>
                        <div className="free__nft__desc">
                            <p>{desc}</p>
                        </div>
                        <button className="pick__nft" onClick={btn}>
                            Pick Me
                        </button>
                    </div>
                </div>
            </label>
        </div>
    );
};

export default FreeCard;

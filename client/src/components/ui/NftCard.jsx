import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./nft-card.css";
// import defaultImg from "../../assets/images/img.jpg";

import Modal from "./Modal";
// import NftDetails from "../pages/NftDetails";
// import { useSelector } from "react-redux";
// import axios from "axios";

const NftCard = (props) => {
  const { id, creatorImg, creator } = props.item;

  const [showModal, setShowModal] = useState(false);

  // const CreateNFTContract = useSelector(
  //   (state) => state.AppState.CreateNFTContract
  // );
  // const Account = useSelector((state) => state.AppState.account);

  useEffect(async () => {
    // console.log(props.item);
    // console.log(props.item.formInput.name);
    // if (props.item) {
    //   setchangeImg(props.item.fileUrl);
    //   setchangeName(props.item.formInput.name);
    //   setchangeDesc(props.item.formInput.description);
    //   setchangePrice(props.item.formInput.price);
    // }
  }, [props.item]);

  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={props.item.fileUrl} alt="" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">
          {props.item.formInput.name}
          {/* <Link to={`/market/${id}`}>{changeName}</Link> */}
        </h5>

        {/* 아래는 유저정보 변경시 > 아직 user 가 아닌 관리자만 nft 생성진행중 */}
        <div className="creator__info-wrapper">
          {/* <div className="creator__img">
            <img src={creatorImg} alt="" />
          </div>
          <div className="creator__info">
            <div className="creator">
              <h6>Created By</h6>
              <p>{creator}</p>
            </div> */}

          <div className="prevNft__desc">
            <p>{props.item.formInput.description}</p>
          </div>

          <div className="bid">
            <h6>Current Bid</h6>
            {/* 우리만의 토큰이름을 정해서 아래단위 바꾸기 */}
            <p>{props.item.formInput.price} ETH</p>
          </div>
        </div>
      </div>
      {/* 
      <div className="bid__box">
        <button className="bid__btn" onClick={() => setShowModal(true)}>
          <i className="ri-shopping-bag-line"></i>
          Place Bid
        </button>  */}

      {showModal && <Modal setShowModal={setShowModal} />}

      <span className="view__link">
        <Link to={`/market/${id}`}>View More</Link>
      </span>
    </div>
  );
};

export default NftCard;

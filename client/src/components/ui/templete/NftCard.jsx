import React, { useState } from "react";

import "./nft-card.css";
import Modal from "../templete/Modal";
import { Col, Row } from "reactstrap";
import NftDetails from "../../pages/Market/NftDetails";
import { Routes, Route, Link, useParams } from "react-router-dom";

const NftCard = (props) => {
  const [showModal, setShowModal] = useState(false);

  let params = useParams();

  return (
    <div>
      <div className="single__nft__card">
        <div className="nft__img">
          <img src={props.item.fileUrl} alt="" />
        </div>

        <div className="nft__content">
          <Row>
            <h5 className="nft__title">
              <Link to={`/detailes/${props.item.formInput.tokenId}`}>
                {" "}
                {props.item.formInput.name}
              </Link>
            </h5>

            {/* 아래는 유저정보 변경시 > 아직 user 가 아닌 관리자만 nft 생성진행중 */}
            {/* <div className="creator__info-wrapper">
          <div className="creator__img">
            <img src={creatorImg} alt="" />
          </div>
          <div className="creator__info">
            <div className="creator">
              <h6>Created By</h6>
              <p>{creator}</p>
            </div> */}
            <Col>
              <div className="bid__container">
                <h6>Current Bid</h6>
                {/* 우리만의 토큰이름을 정해서 아래단위 바꾸기 */}
                <p>{props.item.formInput.price} ETH</p>
              </div>
            </Col>
            <Col>
              <div className="prevNft__desc">
                <p>{props.item.formInput.description}</p>
              </div>
            </Col>
          </Row>
        </div>

        <div className="bid__box">
          <button className="bid__btn" onClick={() => setShowModal(true)}>
            <i className="ri-shopping-bag-line"></i>
            Place Bid
          </button>

          {showModal && <Modal item={props.item} setShowModal={setShowModal} />}

          <span className="view__link">
            <Link to={`/detailes/${props.item.formInput.tokenId}`}>
              View More
            </Link>
          </span>
        </div>
      </div>
      <Routes>
        <Route path="detailes/*" element={<NftDetails item={props.item} />} />
      </Routes>
    </div>
  );
};

export default NftCard;

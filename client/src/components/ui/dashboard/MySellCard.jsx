import React, { useEffect, useState } from "react";

import "./mysell-card.css";
// import SellModal from "../templete/SellModal";
import { Col, Row } from "reactstrap";
import NftDetails from "../../pages/Market/NftDetails";
import { Routes, Route, Link, useParams } from "react-router-dom";

import SellModal from "../templete/SellModal";

import { FaStar } from "react-icons/fa";
import Badge from "react-bootstrap/Badge";

const NftSellCard = (props) => {
  //   let params = useParams();
  const [showModal, setShowModal] = useState(false);

  // const [rating, setRating] = useState(null);
  // const [hover, setHover] = useState(null);
  const stars = Array(5).fill(1);
  const [currentValue, setCurrnetValue] = useState(props.item.formInput.star);
  const [hoverValue, setHoverValue] = useState(undefined);

  const handleClick = (value) => {
    setCurrnetValue(value);
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  console.log(props.item.formInput.star);

  useEffect(() => {}, [currentValue]);

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
              <Badge pill bg="light" text="dark" className="rare__badge">
                rare :
              </Badge>
            </Col>
            <Col>
              <div className="prevNft__desc">
                <p>{props.item.formInput.description}</p>
              </div>
              <div className="pixel__container">
                {stars.map((_, i) => {
                  const ratingValue = props.item.formInput.star;
                  return (
                    <label key={i}>
                      <input
                        type="radio"
                        className="rating"
                        value={ratingValue}
                      />
                      <FaStar
                        className="star"
                        defaultValue={props.item.formInput.star}
                        key={i}
                        color={
                          (hoverValue || currentValue) > i
                            ? "#ffc107"
                            : "#e4e5e9"
                        }
                        size={20}
                        onChange={() => setCurrnetValue(ratingValue)}
                      />
                    </label>
                  );
                })}
              </div>
            </Col>
          </Row>
        </div>

        <div className="bid__box">
          <div className="sell__box">
            <button className="sell__btn" onClick={() => setShowModal(true)}>
              <i className="ri-price-tag-3-line"></i>
              Sell
            </button>
          </div>
          <span className="view__link">
            <Link to={`/detailes/${props.item.formInput.tokenId}`}>
              View More
            </Link>
          </span>
        </div>
      </div>
      {showModal && <SellModal item={props.item} setShowModal={setShowModal} />}
      <Routes>
        <Route path="detailes/*" element={<NftDetails item={props.item} />} />
      </Routes>
    </div>
  );
};

export default NftSellCard;

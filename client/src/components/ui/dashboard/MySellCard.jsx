import React, { useEffect, useState } from "react";

import "./mysell-card.css";

import { Col, Row } from "reactstrap";
import NftDetails from "../../pages/Market/NftDetails";
import { Routes, Route, Link } from "react-router-dom";

import SellModal from "../templete/SellModal";

import { FaStar } from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import { useDispatch, useSelector } from "react-redux";
import { mymodal } from "../../../redux/actions";

const NftSellCard = (props) => {
  const MyModal = useSelector((state) => state.AppState.MyModal);
  const dispatch = useDispatch();

  const stars = Array(5).fill(1);

  const [testdata, setTestdata] = useState(null);

  useEffect(() => {
    setTestdata(props.item);
  }, [props]);

  return (
    // 옵션 발동시 > <div className="box__ainmation"> 활설화
    <div class="box__ainmation">
      <div className="single__nft__card">
        <div className="nft__img">
          <img src={props.item.fileUrl} alt="" />
        </div>

        <div className="nft__content">
          <Row>
            <h5 className="nft__title">
              <Link to={`/detailes/${props.item.formInput.tokenid}`}>
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
                <p>{props.item.formInput.price} AAT</p>
              </div>
              <Badge pill bg="light" text="dark" className="rare__badge">
                rare : {props.item.formInput.rare}
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
                        defaultValue={ratingValue}
                        key={i}
                        color={ratingValue > i ? "#ffc107" : "#e4e5e9"}
                        size={20}
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
            <button
              className="sell__btn"
              onClick={() => {
                dispatch(
                  mymodal({
                    MyModal: true,
                    tokenId: Number(props.item.formInput.tokenid),
                    price: Number(props.item.formInput.price),
                  })
                );
              }}
            >
              {/* <button className="sell__btn" onClick={() => setShowModal(true)}> */}
              <i className="ri-price-tag-3-line"></i>
              Sell
            </button>
          </div>
          <span className="view__link">
            <Link to={`/detailes/${props.item.formInput.tokenid}`}>
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

export default NftSellCard;

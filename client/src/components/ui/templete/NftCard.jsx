import React, { useEffect, useState } from "react";
import "./nft-card.css";
import "../../pages/Admin/owner-sellList.css";
import Modal from "../templete/Modal";
import { Col, Row } from "reactstrap";
import NftDetails from "../../pages/Market/NftDetails";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import { useSelector } from "react-redux";
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";

const NftCard = (props) => {
  const [Loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const account = useSelector((state) => state.AppState.account);
  const isUser = useSelector((state) => state.AppState.isUser);
  const stars = Array(5).fill(1);
  const Navi = useNavigate();

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #5900ff;
    width: 100%;
    height: 100%;
    background: #34343465;
  `;

  return (
    <div>
      {Loading ? (
        <FadeLoader
          size={150}
          color={"#4512bc"}
          css={override}
          loading={Loading}
        />
      ) : (
        <div className="single__nft__card">
          <div className="nft__img">
            <img src={props.item.fileUrl} alt="" />
          </div>

          <div className="nft__content">
            <Row>
              <h5 className="nft__title">
                <Link to={`/detailes/${props.item.formInput.tokenid}`}>
                  {props.item.formInput.name}
                </Link>
              </h5>
              <Col>
                <div className="bid__container">
                  <h6>Current Bid</h6>
                  <p>{props.item.formInput.price} AAT</p>
                  <Badge pill bg="light" text="dark" className="rare__badge">
                    rare : {props.item.formInput.rare}
                  </Badge>
                </div>
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
          {props.default ? (
            true
          ) : (
            <div className="bid__box">
              <button
                className="bid__btn"
                onClick={() => {
                  if (account === null) return alert("지갑 연결이 필요합니다.");
                  if (isUser === false) {
                    if (
                      window.confirm(
                        "회원가입이 필요합니다.\n회원가입페이지로 이동할까요?"
                      )
                    ) {
                      return Navi("/join/step1");
                    }
                    return;
                  }
                  setShowModal(true);
                }}
              >
                <i className="ri-shopping-bag-line"></i>
                Place a Bid
              </button>

              {showModal && (
                <Modal
                  item={props.item}
                  setShowModal={setShowModal}
                  setLoading={props.setLoading}
                />
              )}

              <span className="view__link">
                <Link to={`/detailes/${props.item.formInput.tokenid}`}>
                  View More
                </Link>
              </span>
            </div>
          )}
        </div>
      )}
      <Routes>
        <Route path="detailes/*" element={<NftDetails />} />
      </Routes>
    </div>
  );
};

export default NftCard;

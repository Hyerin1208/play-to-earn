import React, { useEffect, useState } from "react";
import "./nft-card.css";
import "../../pages/Admin/owner-sellList.css";
import Modal from "../templete/Modal";
import { Col, Row } from "reactstrap";
import NftDetails from "../../pages/Market/NftDetails";
import { Routes, Route, Link } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import { utils } from "ethers";

const NftCard = (props) => {
    const [showModal, setShowModal] = useState(false);

    const stars = Array(5).fill(1);
    const [testdata, setTestdata] = useState(null);

    useEffect(() => {
        setTestdata(props.item);
    }, [props]);

    return (
        <div>
            <div className="single__nft__card">
                <div className="nft__img">
                    <img src={props.item.fileUrl} alt="" />
                </div>

                <div className="nft__content">
                    <Row>
                        <h5 className="nft__title">
                            <Link to={`/detailes/${props.item.formInput.tokenId}`}>{props.item.formInput.name}</Link>
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
                                {/* <p>{props.item.formInput.price} AAT</p> */}
                                <p>{utils.formatEther(props.item.formInput.price)} AAT</p>
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
                                            <input type="radio" className="rating" value={ratingValue} />
                                            <FaStar className="star" defaultValue={ratingValue} key={i} color={ratingValue > i ? "#ffc107" : "#e4e5e9"} size={20} />
                                        </label>
                                    );
                                })}
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
                        <Link to={`/detailes/${props.item.formInput.tokenId}`}>View More</Link>
                    </span>
                </div>
            </div>
            <Routes>
                <Route path="detailes/*" element={<NftDetails />} />
            </Routes>
        </div>
    );
};

export default NftCard;

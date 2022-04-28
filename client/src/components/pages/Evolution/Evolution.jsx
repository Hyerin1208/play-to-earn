import React, { Fragment, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

import "./evolution.css";

import EvoDetails from "./EvoDetails";
import { Col, Container, Row } from "reactstrap";
import { Link, Route, Routes } from "react-router-dom";
import MyDash from "../Mypage/MyDash";
import EvoProfile from "./EvoProfile";

import { FaStar } from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import { useDispatch, useSelector } from "react-redux";
import { utils } from "ethers";

import { updateLists } from "../../../redux/actions/index";

import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";

const Evolution = () => {
  const dispatch = useDispatch();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const [Loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [EvoProfileModal, setEvoProfileModal] = useState(false);
  const [imageURL, setImageURL] = useState([]);
  const [beforeEvo, setBeforeEvo] = useState(null);

  const [afterEvo, setAfterEvo] = useState({
    fileUrl: null,
    formInput: {
      tokenid: 0,
      price: "00.00",
      rare: 1,
      star: 1,
      name: "noname",
      description: "description",
    },
  });

  const [NFTIndex, setNFTIndex] = useState(null);
  const [NFTId, setNFTId] = useState(null);

  const stars = Array(5).fill(1);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #5900ff;
    width: 100%;
    height: 100%;
    background: #34343465;
  `;

  return (
    <Fragment>
      {Loading ? (
        <div
          className={Loading ? "parentDisable" : ""}
          width="100%"
          height="100%"
        >
          <div className="overlay-box">
            <FadeLoader
              size={150}
              color={"#ffffff"}
              css={override}
              loading={Loading}
              z-index={"1"}
              text="Loading your content..."
            />
          </div>
        </div>
      ) : (
        false
      )}
      <Row className="row__box">
        <Col md="5">
          <div className="card__wrapper">
            <motion.div
              className="card__container"
              style={{ x, y, rotateX, rotateY, z: 100 }}
              drag
              dragElastic={0.16}
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              whileTap={{ cursor: "grabbing" }}
            >
              <div className="top__container">
                <div className="circle__wrapper">
                  <div className="circle__cir"></div>
                </div>
                <div className="evolution__wrapper">
                  <motion.div
                    className="evolution__evo"
                    style={{
                      x,
                      y,
                      rotateX,
                      rotateY,
                      rotate: "-13deg",
                      z: 10000,
                    }}
                  >
                    <div
                      className="upload__evo"
                      onClick={() => {
                        setEvoProfileModal(true);
                        setVisible(true);
                      }}
                    >
                      {visible ? "" : <i className="ri-add-circle-line"></i>}
                      {beforeEvo !== null ? (
                        <img
                          className="evo__iamge"
                          src={beforeEvo.fileUrl}
                          id="upload__pfp"
                          alt="edit"
                          onClick={() => {
                            setEvoProfileModal(true);
                            setVisible(true);
                          }}
                        />
                      ) : (
                        false
                      )}
                    </div>
                  </motion.div>
                </div>

                <div className="evolu__text">Naming Center</div>
              </div>

              <div className="bottom__container">
                <EvoDetails
                  data={{
                    NFTIndex: NFTIndex,
                    NFTId: NFTId,
                    setAfterEvo: setAfterEvo,
                  }}
                  setLoading={setLoading}
                />
                <div className="evolu__details" />
              </div>
            </motion.div>
          </div>
        </Col>
        {EvoProfileModal && (
          <EvoProfile
            setShowModal={setEvoProfileModal}
            setBeforeEvo={setBeforeEvo}
            setNFTIndex={setNFTIndex}
            setNFTId={setNFTId}
            setVisible={setVisible}
          />
        )}
        <Col md="2">
          <div className="right__arrows">
            <i className="ri-arrow-right-line"></i>
          </div>
          <br />
          <div className="evolution__nfts">
            <div className="card__content">
              <div className="earning__chart">
                <i className="ri-copper-diamond-line"></i>
              </div>
              <div className="earing__text">
                <div className="token__mybox"> 100 AAT</div>
                <div className="token__mydesc">Balance</div>
              </div>
            </div>
          </div>
        </Col>
        <Col md="5">
          <div className="last__evobox">
            <div>
              <div className="single__nft__card">
                <div className="nft__img">
                  {afterEvo.fileUrl === null ? (
                    <i className="ri-question-line"></i>
                  ) : (
                    <img src={afterEvo.fileUrl} alt="" />
                  )}
                </div>

                <div className="nft__content">
                  <Row>
                    <h5 className="nft__title">
                      {afterEvo !== null ? afterEvo.formInput.name : "dsfsdf"}
                      {/* <Link to={`/detailes/${props.item.formInput.tokenId}`}>
                        {props.item.formInput.name}
                      </Link> */}
                    </h5>
                    <Col>
                      <div className="bid__container">
                        <h6>Current Bid</h6>
                        {afterEvo !== null ? afterEvo.formInput.price : "TOKEN"}
                        {/* <p>{props.item.formInput.price} ETH</p> */}
                        &nbsp;TOKEN
                      </div>
                      <br />
                      <Badge
                        pill
                        bg="light"
                        text="dark"
                        className="rare__badge"
                      >
                        rare :
                        {afterEvo !== null ? afterEvo.formInput.rare : "1"}
                      </Badge>
                    </Col>
                    <Col>
                      <div className="prevNft__desc">
                        {afterEvo !== null
                          ? afterEvo.formInput.description
                          : "description"}
                      </div>
                      <div className="pixel__container">
                        {stars.map((_, i) => {
                          const ratingValue = afterEvo.formInput.star;
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
                <br />
                <div className="bid__box">
                  <div className="sell__box">
                    {/* <button
                      className="sell__btn"
                      onClick={() => setShowModal(true)}
                    >
                      <i className="ri-price-tag-3-line"></i>
                      Sell
                    </button> */}
                  </div>
                  <span className="view__link">
                    <Link to={`/mypage`}>Edit My Profile</Link>
                    {/* 
                    <Link to="">View More</Link> */}
                  </span>
                </div>
              </div>
              <Routes>
                <Route path="mypage" element={<MyDash />} />
              </Routes>
            </div>
          </div>
        </Col>
      </Row>

      <Container>
        <div className="evo__rules">
          <h4>Evolution rules</h4>
          <ul>
            <li>1. Evolution needs to consume 작명소's Token</li>
            <li>
              2. Evolution will only change the rarity and stars, other
              attributes will be inherited (character, talent, skill, potential,
              training).
            </li>
            <li>3. Costs a certain amount of Token and $BNB</li>
          </ul>
        </div>
      </Container>
    </Fragment>
  );
};

export default Evolution;

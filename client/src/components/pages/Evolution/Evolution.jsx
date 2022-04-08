import React, { Fragment, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

import "./evolution.css";

import temporaryData from "../../../assets/images/free.png";
import EvoDetails from "./EvoDetails";
import { Col, Container, Row } from "reactstrap";
import NftCard from "../../ui/templete/NftCard";
import { Link, Route, Routes } from "react-router-dom";
import NftDetails from "../Market/NftDetails";
import SellModal from "../../ui/templete/SellModal";
import EvoProfile from "./EvoProfile";

import { FaStar } from "react-icons/fa";
import Badge from "react-bootstrap/Badge";

const Evolution = (props) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const [Loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [visible, setVisible] = useState(false);

  const [EvoProfileModal, setEvoProfileModal] = useState(false);
  const [imageURL, setImageURL] = useState([]);

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(async () => {
    setLoading(null);
    setImageURL(imageURL);
  }, []);

  return (
    <Fragment>
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
                      onClick={() => setEvoProfileModal(true)}
                    >
                      <i className="ri-add-circle-line"></i>
                    </div>

                    <img
                      className="evo__iamge"
                      src={imageURL}
                      id="upload__pfp"
                      onChange={(e) => {
                        setImageURL(e.target.value);
                      }}
                      alt="edit"
                    />
                  </motion.div>
                </div>

                <div className="evolu__text">Naming Center</div>
              </div>

              <div className="bottom__container">
                <EvoDetails />
                <div className="evolu__details" />
              </div>
            </motion.div>
          </div>
        </Col>
        {EvoProfileModal && (
          <EvoProfile
            setShowModal={setEvoProfileModal}
            setImageURL={setImageURL}
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
                <div className="token__mybox"> 2,000,000 Token</div>
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
                  <i className="ri-question-line"></i>
                </div>

                <div className="nft__content">
                  <Row>
                    <h5 className="nft__title">
                      카드이름
                      {/* <Link to={`/detailes/${props.item.formInput.tokenId}`}>
                        {props.item.formInput.name}
                      </Link> */}
                    </h5>
                    <Col>
                      <div className="bid__container">
                        <h6>Current Bid</h6>
                        금액
                        {/* <p>{props.item.formInput.price} ETH</p> */}
                      </div>
                      <Badge
                        pill
                        bg="light"
                        text="dark"
                        className="rare__badge"
                      >
                        rare :
                      </Badge>
                    </Col>
                    <Col>
                      <div className="prevNft__desc">
                        설명
                        {/* <p>{props.item.formInput.description}</p> */}
                      </div>
                      <div className="pixel__container">
                        {[...Array(5)].map((star, i) => {
                          const ratingValue = i + 1;
                          return (
                            <label key={i}>
                              <input
                                type="radio"
                                className="rating"
                                value={ratingValue}
                                onClick={() => setRating(ratingValue)}
                              />
                              <FaStar
                                className="star"
                                color={
                                  ratingValue <= (hover || rating)
                                    ? "#ffc107"
                                    : "#e4e5e9"
                                }
                                size={20}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
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
                    <button
                      className="sell__btn"
                      onClick={() => setShowModal(true)}
                    >
                      <i className="ri-price-tag-3-line"></i>
                      Sell
                    </button>
                  </div>
                  <span className="view__link">
                    {/* <Link to={`/detailes/${props.item.formInput.tokenId}`}>
                      View More
                    </Link> */}

                    <Link to="">View More</Link>
                  </span>
                </div>
              </div>
              <Routes>
                <Route
                  path="detailes/*"
                  element={<NftDetails item={props.item} />}
                />
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

import React, { Fragment, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

import "./evolution.css";

import temporaryData from "../../../assets/images/free.png";
import EvoDetails from "./EvoDetails";
import { Col, Row } from "reactstrap";
import NftCard from "../../ui/templete/NftCard";
import { Link, Route, Routes } from "react-router-dom";
import NftDetails from "../Market/NftDetails";
import SellModal from "../../ui/templete/SellModal";
import EvoProfile from "./EvoProfile";

const Evolution = (props) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const [showModal, setShowModal] = useState(false);

  const [EvoProfileModal, setEvoProfileModal] = useState(false);

  return (
    <Fragment>
      <Row>
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
                    {/* <img src={temporaryData} alt="" /> */}
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
        {EvoProfileModal && <EvoProfile setShowModal={setEvoProfileModal} />}
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
                  <img src={temporaryData} alt="" />
                </div>

                <div className="nft__content">
                  <Row>
                    <h5 className="nft__title">
                      {/* <Link to={`/detailes/${props.item.formInput.tokenId}`}>
                        {props.item.formInput.name}
                      </Link> */}
                    </h5>
                    <Col>
                      <div className="bid__container">
                        <h6>Current Bid</h6>
                        {/* <p>{props.item.formInput.price} ETH</p> */}
                      </div>
                    </Col>
                    <Col>
                      <div className="prevNft__desc">
                        {/* <p>{props.item.formInput.description}</p> */}
                      </div>
                    </Col>
                  </Row>
                </div>

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

      <Row>{/* <h4>My Collection</h4> */}</Row>
    </Fragment>
  );
};

export default Evolution;

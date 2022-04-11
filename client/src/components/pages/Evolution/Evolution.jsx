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
import EvoBackGround from "./EvoBackGround";
import { useDispatch, useSelector } from "react-redux";
import { utils } from "ethers";

import axios from "axios";

import { updateAccounts } from "../../../redux/actions/index";

const Evolution = (props) => {
  const dispatch = useDispatch();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const [Loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [visible, setVisible] = useState(false);
  // const [apparent, setApparent] = useState(false);

  const [EvoProfileModal, setEvoProfileModal] = useState(false);
  const [imageURL, setImageURL] = useState([]);

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const [accounts, setAccounts] = useState([]);
  const [autoChange, setAutoChange] = useState(false);
  const [dataBox, setDataBox] = useState("");

  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  const Account = useSelector((state) => state.AppState.account);

  useEffect(async () => {
    setLoading(null);
    // setImageURL(imageURL);
  }, []);

  console.log(props.autoChange);
  console.log(imageURL);
  // console.log(props.apparent);

  async function MyList(Account) {
    if (CreateNFTContract !== null) {
      const MyNFTlists = await CreateNFTContract.methods.MyNFTlists().call();

      const listsForm = await Promise.all(
        MyNFTlists.map(async (i) => {
          const tokenURI = await CreateNFTContract.methods
            .tokenURI(i.tokenId)
            .call();
          const meta = await axios.get(tokenURI).then((res) => res.data);
          let item = {
            fileUrl: await meta.image,
            formInput: {
              tokenid: i.tokenId,
              price: i.price,
              rare: i.rare,
              star: i.star,
              name: await meta.name,
              description: await meta.description,
            },
          };
          return await item;
        })
      );
      return await listsForm;
    } else {
      return null;
    }
  }
  // console.log(dataBox);

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
                      onClick={() => {
                        setEvoProfileModal(true);
                        setVisible(!visible);
                      }}
                    >
                      {visible ? "" : <i className="ri-add-circle-line"></i>}
                    </div>

                    {visible && (
                      <img
                        className="evo__iamge"
                        src={imageURL}
                        id="upload__pfp"
                        alt="edit"
                        value={props}
                        onChange={async (e) => {
                          const changeNft = e.target.getAttribute("value");
                          if (!changeNft) {
                            await alert("진화를 원하는 NFT를 선택하세요.");
                          } else {
                            setImageURL(e.target.value);
                          }
                        }}
                      />
                    )}
                  </motion.div>
                </div>

                <div className="evolu__text">Naming Center</div>
              </div>

              <div className="bottom__container">
                <EvoDetails item={imageURL} />
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
          {/* {props.autoChange && ( */}
          <div className="last__evobox">
            <div>
              <div className="single__nft__card">
                <div className="nft__img">
                  {/* {props.apparent && <i className="ri-question-line"></i>} */}
                  {props.apparent ? (
                    <img
                      className="evocard__img"
                      src={dataBox.fileUrl}
                      value={dataBox.fileUrl}
                      id="upload__evocard"
                      onChange={(e) => {
                        setImageURL(e.target.value);
                      }}
                      alt=""
                    />
                  ) : (
                    <i className="ri-question-line"></i>
                  )}
                  <img src={dataBox.fileUrl} alt="" />
                </div>

                <div className="nft__content">
                  <Row>
                    <h5 className="nft__title">
                      {props.item}
                      {/* <Link to={`/detailes/${props.item.formInput.tokenId}`}>
                        {props.item.formInput.name}
                      </Link> */}
                    </h5>
                    <Col>
                      <div className="bid__container">
                        <h6>Current Bid</h6>
                        {dataBox.price}
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
          {/* )} */}
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
      {/* <EvoBackGround /> */}
    </Fragment>
  );
};

export default Evolution;

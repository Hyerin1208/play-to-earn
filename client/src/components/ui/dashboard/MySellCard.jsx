import React, { useEffect, useState } from "react";

import "./mysell-card.css";

import { Col, Row } from "reactstrap";
import NftDetails from "../../pages/Market/NftDetails";
import { Routes, Route, Link } from "react-router-dom";

import SellModal from "../templete/SellModal";

import { FaStar } from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import { useDispatch, useSelector } from "react-redux";
import {
  mymodal,
  updateMyLists,
  updateSellLists,
} from "../../../redux/actions";

const NftSellCard = (props) => {
  const MyModal = useSelector((state) => state.AppState.MyModal);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );
  const account = useSelector((state) => state.AppState.account);
  const Selllists = useSelector((state) => state.AppState.Selllists);
  const MyNFTlists = useSelector((state) => state.AppState.MyNFTlists);
  const dispatch = useDispatch();

  const stars = Array(5).fill(1);

  function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  }

  useEffect(() => {
    return () => {
      dispatch(
        mymodal({
          MyModal: false,
        })
      );
    };
  }, []);

  return (
    <div>
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
              <i className="ri-price-tag-3-line"></i>
              Sell
            </button>
          </div>
          <button
            className="retract__btn"
            onClick={async () => {
              if (CreateNFTContract !== null) {
                if (window.confirm("판매를 취소하시겠습니까?")) {
                  props.setLoading(true);
                  await CreateNFTContract.methods
                    .changeSellState(Number(props.item.formInput.tokenid))
                    .send({ from: account, gas: 3000000 })
                    .then(async (res) => {
                      const index = MyNFTlists.findIndex((lists) => {
                        if (
                          Number(lists.formInput.tokenid) ===
                          Number(props.item.formInput.tokenid)
                        ) {
                          return true;
                        }
                      });
                      MyNFTlists[index].formInput.sell = false;
                      dispatch(updateMyLists({ MyNFTlists: [...MyNFTlists] }));

                      const sellindex = Selllists.findIndex((lists) => {
                        if (
                          Number(lists.formInput.tokenid) ===
                          Number(props.item.formInput.tokenid)
                        ) {
                          return true;
                        }
                      });
                      if (sellindex !== -1) {
                        Selllists.splice(sellindex, 1);
                        dispatch(
                          updateSellLists({
                            Selllists: Selllists,
                          })
                        );
                      }
                      sleep(2000);
                      props.setLoading(false);
                      props.setCheckChange(!props.checkChange);
                    });
                }
              }
            }}
          >
            <i className="ri-arrow-go-back-line"></i>
            Retract
          </button>
          {/* <span className="view__link">
            <Link to={`/detailes/${props.item.formInput.tokenid}`}>
              View More
            </Link>
          </span> */}
        </div>
      </div>

      <Routes>
        <Route path="detailes/*" element={<NftDetails item={props.item} />} />
      </Routes>
    </div>
  );
};

export default NftSellCard;

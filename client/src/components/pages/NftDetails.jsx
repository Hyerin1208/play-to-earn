import React, { useEffect, useState } from "react";

import CommonSection from "../ui/CommonSection";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
// sort 기능 구현후 아래 data지울예정
import { NFT__DATA } from "../../assets/data/data";

import LiveList from "../ui/LiveList";
import "./nft-details.css";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const NftDetails = (props) => {
  const OwnerSelllists = useSelector((state) => state.AppState.OwnerSelllists);
  const [nftArray, setnftArray] = useState([]);

  // Router.js => path="/market/:id"
  let params = useParams();
  const card_id = params.card_id;

  // const singleNft = NFT__DATA.find((item) => item.id === id);

  useEffect(async () => {
    setnftArray([...OwnerSelllists].reverse());
  }, [OwnerSelllists]);

  console.log(nftArray[card_id].fileUrl);

  return (
    <>
      {/* <div>안녕{card_id}</div> */}
      <CommonSection title={nftArray[card_id].formInput.name} />
      <div className="detail__box">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <img
                src={nftArray[card_id].fileUrl}
                alt=""
                className="single__nft-img"
              />
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="single__nft__content">
                <h2>{nftArray[card_id].formInput.name}</h2>
              </div>

              <div className="single__nft__icon">
                <div className="single__nft-seen">
                  <span>
                    <i className="ri-eye-line"></i> 234
                  </span>
                  <span>
                    <i className="ri-heart-line"></i> 123
                  </span>
                </div>

                <div className="single__nft-more">
                  <span>
                    <i className="ri-send-plane-line"></i>
                  </span>
                  <span>
                    <i className="ri-more-2-line"></i>
                  </span>
                </div>
              </div>
              {/* 아래는 임시 owner 정보 */}
              <div className="nft__creator">
                <div className="creator__img">
                  <img src={NFT__DATA.creatorImg} alt="" />
                </div>

                <div className="creator__detail">
                  <p>Created By</p>
                  <h6>{NFT__DATA.creator}</h6>
                </div>
              </div>

              <div className="singleNft_price">
                <p>{nftArray[card_id].formInput.price}</p>
              </div>

              <p className="my-3">{nftArray[card_id].formInput.description}</p>
              <button className="singleNft-btn">
                <i className="ri-shopping-bag-line"></i>
                <Link to="/wallet">Place a Bid</Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>
      <LiveList />
    </>
  );
};

export default NftDetails;

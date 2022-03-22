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

import axios from "axios";

const NftDetails = (items) => {
  const dispatch = useDispatch();
  const OwnerSellists = useSelector((state) => state.AppState.OwnerSellists);
  const [loadcheck, setnftArray] = useState([]);

  useEffect(() => {
    if (OwnerSellists !== null) {
      console.log("first");
      setnftArray([...OwnerSellists].reverse());
      setLoadcheck(null);
    }
  }, [OwnerSellists]);

  const Account = useSelector((state) => state.AppState.account);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  // Router.js => path="/market/:id"
  const { id } = useParams();
  // const singleNft = NFT__DATA.find((item) => item.id === id);
  const singleNft = CreateNFTContract.methods.send(
    (item) => item.formInput.id === id
  );

  console.log(id);

  return (
    <>
      <CommonSection title={items.formInput.name} />
      <div className="detail__box">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <img src={items.fileUrl} alt="" className="single__nft-img" />
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="single__nft__content">
                <h2>{items.formInput.name}</h2>
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

              {/* 아래는 creator 정보 미수정 */}
              <div className="nft__creator">
                {/* <div className="creator__img">
                  <img src={singleNft.fileUrl} alt="" />
                </div> */}

                <div className="creator__detail">
                  <p>Created By</p>
                  {/* <h6>{singleNft.creator}</h6> */}
                </div>
              </div>

              <p className="my-3">{items.formInput.description}</p>
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

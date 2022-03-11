import React from "react";

import CommonSection from "../ui/CommonSection";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { NFT__DATA } from "../../assets/data/data";

import LiveList from "../ui/LiveList";
import "./nft-details.css";

import { Link } from "react-router-dom";

const NftDetails = () => {
  // Router.js => path="/market/:id"
  const { id } = useParams();

  const singleNft = NFT__DATA.find((item) => item.id === id);

  return (
    <>
      <CommonSection title={singleNft.title} />
      <div className="detail__box">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <img src={singleNft.imgUrl} alt="" className="single__nft-img" />
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="single__nft__content">
                <h2>{singleNft.title}</h2>
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
              <div className="nft__creator">
                <div className="creator__img">
                  <img src={singleNft.creatorImg} alt="" />
                </div>

                <div className="creator__detail">
                  <p>Created By</p>
                  <h6>{singleNft.creator}</h6>
                </div>
              </div>

              <p className="my-3">{singleNft.desc}</p>
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

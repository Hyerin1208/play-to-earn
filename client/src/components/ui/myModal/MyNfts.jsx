import React from "react";
import { Col, Container, Row } from "reactstrap";
import NftCard from "../NftCard";

import "./my-nfts.css";

import img from "../../../assets/images/img.jpg";

const item = [
  {
    id: "1",
    title: "Guard",
    imgUrl: img,
  },
];

const MyNfts = ({ setShowModal }) => {
  return (
    <div className="nft_wrapper">
      <div className="single_modal">
        <span className="close_modal">
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h6 className="text-center text-light">My NFTs</h6>
        <p className="text-center text-light">Buy. Sell. Collect.</p>

        <div className="box__myNft">
          <div className="mynft__list">
            <Container>
              <Row>
                <Col lg="6" md="4" sm="2">
                  <NftCard item={item} />
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNfts;

import React from "react";

import CommonSection from "../ui/CommonSection";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { NFT__DATA } from "../../assets/data/data";

import LiveList from "../ui/LiveList";

const NftDetails = () => {
  // Router.js => path="/market/:id"
  const { id } = useParams();

  const singleNft = NFT__DATA.find((item) => item.id === id);

  return (
    <>
      <CommonSection title={singleNft.title} />
      <section>
        <Row>
          <Col lg="6">
            <img src={singleNft.imgUrl} alt="" className="w-100" />
          </Col>

          <Col lg="6">
            <div className="single__nft__content">
              <h2>{singleNft.title}</h2>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default NftDetails;

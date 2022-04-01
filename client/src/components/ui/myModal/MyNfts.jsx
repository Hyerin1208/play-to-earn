import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import NftCard from "../NftCard";

import "./my-nfts.css";

import { NFT__DATA } from "../../../assets/data/data";

const MyNfts = ({ setShowModal }) => {
  const [seletedImg, setSelectedImg] = useState(NFT__DATA[0]);

  // const handleSeleted = () => {
  //   setSelectedImg((prevImage) => [...prevImage]);
  // };

  useEffect(() => {
    console.log("update");
  }, [seletedImg]);

  // console.log(seletedImg.imgUrl);

  return (
    <div className="nft_wrapper">
      <div className="single_modal">
        <span className="close_modal">
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h6 className="text-center text-light">Choose your NFTs</h6>
        <p className="text-center text-light">Buy. Sell. Collect.</p>

        <div className="box__myNft">
          <div className="mynft__list">
            <Container className="images__box">
              <Row>
                {/* <Col lg="6" md="4" sm="2"> */}
                {/* <NftCard item={item} /> */}
                {/* </Col> */}
                <img
                  src={seletedImg.imgUrl}
                  alt="Selected"
                  className="selected"
                />
                <div className="img__Container">
                  {NFT__DATA.map((img, index) => (
                    <img
                      key={index}
                      src={img.imgUrl}
                      alt="nfts"
                      onClick={() => setSelectedImg(img)}
                      style={{
                        border: seletedImg === img ? "4px solid purple" : "",
                      }}
                    />
                  ))}
                </div>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNfts;

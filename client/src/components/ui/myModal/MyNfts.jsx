import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import NftCard from "../NftCard";

import "./my-nfts.css";

const MyNfts = ({ setShowModal }) => {
  const Account = useSelector((state) => state.AppState.account);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  //내 nft 리스트
  async function mynftlists() {
    const lists = await CreateNFTContract.methods
      .MyNFTlists()
      .call({ from: Account }, (error) => {
        if (!error) {
          console.log("send ok");
        } else {
          console.log(error);
        }
      });
    console.log(await lists);
  }

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
                {/* <Col lg="6" md="4" sm="2">
                  <NftCard item={item} />
                </Col> */}
                <div className="mynft__container">{}</div>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNfts;

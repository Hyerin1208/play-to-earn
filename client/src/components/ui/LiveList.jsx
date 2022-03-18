import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./live-list.css";

import NftCard from "./NftCard";
import { NFT__DATA } from "../../assets/data/data.js";

const LiveList = () => {
  //오너 nft 판매 리스트
  async function ownerselllists() {
    const lists = await CreateNFTContract.methods
      .OwnerSelllists()
      .call({ from: Account }, (error) => {
        if (!error) {
          console.log("send ok");
        } else {
          console.log(error);
        }
      });
    console.log(await lists);
  }

  //유저 nft 판매 리스트
  async function userselllists() {
    const lists = await CreateNFTContract.methods
      .UserSelllists()
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
    <div className="live__box">
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="live__list__top">
              <h3>Top collections over last 7 days</h3>
              <span>
                <Link to="/market">Explor more</Link>
              </span>
            </div>
          </Col>

          {NFT__DATA.slice(0, 4).map((item, index) => (
            <Col lg="3" md="4" sm="6" key={index} className="mb-4">
              <NftCard key={item.id} item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default LiveList;

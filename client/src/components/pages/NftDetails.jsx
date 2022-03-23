import React, { useEffect, useState } from "react";
import ReactLoaing from "react-loading";

import CommonSection from "../ui/CommonSection";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import LiveList from "../ui/LiveList";
import axios from "axios";

import "./nft-details.css";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NftDetails = () => {
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );
  const [Loading, setLoading] = useState(true);
  const [calldata, setCalldata] = useState(null);
  let params = useParams();
  const card_id = params.card_id;

  useEffect(async () => {
    gettokenuri(card_id);
  }, [CreateNFTContract]);

  async function gettokenuri(tokenId) {
    const tokenURI = await CreateNFTContract.methods
      .tokenURI(tokenId)
      .call((error) => {
        if (!error) {
          console.log("send ok");
        } else {
          console.log(error);
        }
      });
    await axios.get(tokenURI).then(async (data) => {
      setCalldata(await data.data);
      setLoading(false);
    });
  }
  console.log(calldata);

  function testfunc(Loading) {
    if (Loading) {
      return (
        <div>
          잠시만 기다려 주세요
          <ReactLoaing
            type={"bars"}
            color={"purple"}
            height={667}
            width={375}
          />
        </div>
      );
    } else {
      return (
        <>
          <div className="detail__box">
            <CommonSection title={calldata.name} />
            <Container>
              <Row>
                <Col lg="6" md="6" sm="6">
                  <img
                    src={calldata.image}
                    alt=""
                    className="single__nft-img"
                  />
                </Col>

                <Col lg="6" md="6" sm="6">
                  <div className="single__nft__content">
                    <h2>{calldata.name}</h2>
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
                  <div className="singleNft_price">
                    <p>{calldata.price}</p>
                  </div>

                  <p className="my-3">{calldata.description}</p>
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
    }
  }

  return (
    <>
      {/* <div>안녕{card_id}</div> */}
      {testfunc(Loading)}
    </>
  );
};

export default NftDetails;

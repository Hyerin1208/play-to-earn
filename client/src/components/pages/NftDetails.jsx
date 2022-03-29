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

  const [like, setLike] = useState(2);
  const [view, setView] = useState(0);

  const [likeActive, setLikeActive] = useState(false);
  const [viewActive, setViewActive] = useState(false);

  let params = useParams();
  const card_id = params.card_id;

  // test
  const sendLike = async () => {
    const tokenId = 1;
    const userAdd = "ad1";
    // if (likeActive) {
    //   setLikeActive(false);
    //   setLike(like - 1);
    // } else {
    //   setLikeActive(true);
    //   setLike(like + 1);
    // }
    await axios.post(`http://localhost:5000/nfts`, { id: like }).then((res) => {
      console.log(res.data.message);
      //   setLike(like + 1);
      // alert("좋아요 등록 완료");
    });
  };

  // test

  useEffect(async () => {
    gettokenuri(card_id);
  }, [CreateNFTContract]);

  // function likeBtn() {
  //   if (likeActive) {
  //     setLikeActive(false);
  //     setLike(like - 1);
  //   } else {
  //     setLikeActive(true);
  //     setLike(like + 1);
  //   }
  // }

  function viewBtn() {
    if (viewActive) {
      setViewActive(false);
    } else {
      setViewActive(view + 1);
      setView(view + 1);
    }
  }

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
          <ReactLoaing
            type={"balls"}
            color={"purple"}
            height={667}
            width={375}
          />
        </div>
      );
    } else {
      return (
        <>
          <CommonSection title={calldata.name} />
          <div className="detail__box">
            <Container>
              <Row className="row__box">
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
                        <button
                          className="nft-heart__btn"
                          type="submit"
                          onClick={sendLike}
                        >
                          <i className="ri-heart-line"></i> {like}
                        </button>
                      </span>

                      <span>
                        <button className="nft-view__btn" onClick={viewBtn}>
                          <i className="ri-eye-line"></i> {view}
                        </button>
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
                    <p>
                      Price : <span>{calldata.price}</span> ETH
                    </p>
                  </div>

                  <p className="my-3">Description : {calldata.description}</p>
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

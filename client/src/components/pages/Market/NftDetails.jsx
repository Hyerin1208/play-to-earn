import React, { useEffect, useState } from "react";
import ReactLoaing from "react-loading";

import { FiHeart } from "react-icons/fi";

import CommonSection from "../../ui/templete/CommonSection";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Table } from "reactstrap";
import LiveList from "../../ui/mainContents/LiveList";
import axios from "axios";

import { FaStar } from "react-icons/fa";

import "./nft-details.css";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Badge from "react-bootstrap/Badge";

const NftDetails = (props) => {
  const account = useSelector((state) => state.AppState.account);

  const [Loading, setLoading] = useState(true);

  const [like, setLike] = useState(0);
  const [view, setView] = useState(0);

  const [viewActive, setViewActive] = useState(false);

  const stars = Array(5).fill(1);

  const [NFTData, setNFTData] = useState("");
  const [nftHistory, setNftHistory] = useState([]);

  let params = useParams();
  const card_id = params.card_id;

  const sendLike = async () => {
    await axios
      .post(`http://localhost:5000/nfts/like`, {
        tokenId: card_id,
        account: account,
      })
      .then((res) => {
        console.log(res.data.message);
        if (res.data.message === "ok") {
          setLike(like + 1);
          alert("좋아요 등록 완료");
        } else {
          setLike(like - 1);
          alert("좋아요 취소 ㅠㅠ");
        }
      });
  };
  useEffect(async () => {
    await axios
      .post(`http://localhost:5000/nfts/views`, {
        tokenId: card_id,
      })
      .then((res) => {
        console.log(res.data.view);
        setView(res.data.view);
      });
  }, []);

  useEffect(async () => {
    console.log(card_id);
    await axios
      .post(`http://localhost:5000/nfts`, {
        tokenId: card_id,
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setLike(res.data.likes);
        setView(res.data.views);
        setNFTData(res.data);
      });
  }, []);

  useEffect(async () => {
    console.log(card_id);
    await axios
      .post(`http://localhost:5000/history/info`, {
        tokenId: card_id,
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        // if (Loading == false && nftHistory !== null) {
        setNftHistory(res.data);
        // }
      });
  }, []);

  console.log(nftHistory);

  function Loadingfunc(Loading) {
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
          <CommonSection title={NFTData.name} />
          <div className="detail__box">
            <Container>
              <Row className="row__box">
                <Col lg="6" md="6" sm="6">
                  {/* 아래 이미지만 들어오도록 */}
                  <img
                    src={NFTData.img}
                    alt=""
                    className="single__nft-img"
                    style={{ width: "540px", height: "630px" }}
                  />
                </Col>

                <Col lg="6" md="6" sm="6">
                  <div className="single__nft__content">
                    <h2>{NFTData.name}</h2>
                  </div>
                  <div className="owner__address__box">
                    owner : {NFTData.address}
                  </div>

                  <div className="single__nft__icon">
                    <div className="single__nft-seen">
                      <span>
                        <button
                          className="nft-heart__btn"
                          type="submit"
                          onClick={sendLike}
                        >
                          <FiHeart className="heart__beat" /> {like}
                          {/* <i className="ri-heart-line"></i> {like} */}
                        </button>
                      </span>

                      <span>
                        <button className="nft-view__btn">
                          <i className="ri-eye-line"></i> {view}
                        </button>
                      </span>

                      <span>
                        <Badge
                          pill
                          bg="light"
                          text="dark"
                          className="rare__Badge"
                          style={{ width: "110px", height: "32px" }}
                        >
                          rare : {NFTData.rare}
                        </Badge>
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
                      Price : <span>{NFTData.price}</span> ETH
                    </p>
                  </div>

                  <div className="pixel__container">
                    {stars.map((_, i) => {
                      const ratingValue = NFTData.star;
                      return (
                        <label key={i}>
                          <input
                            type="radio"
                            className="rating"
                            value={ratingValue}
                          />
                          <FaStar
                            className="star"
                            defaultValue={ratingValue}
                            key={i}
                            color={ratingValue > i ? "#ffc107" : "#e4e5e9"}
                            size={20}
                          />
                        </label>
                      );
                    })}
                  </div>

                  <p className="my-3">Description : {NFTData.description}</p>
                  <button className="singleNft-btn">
                    <i className="ri-shopping-bag-line"></i>
                    <Link to="/wallet">Place a Bid</Link>
                  </button>
                  <br />
                  <div className="accordian__box">
                    <div className="tab__tab">
                      <span>History</span>
                      <i className="ri-add-line"></i>
                    </div>
                    {/* <div className={this.state.showInfo ? "show__content" : "content"}> */}
                    <div className="content__text">
                      <Table dark style={{ tableLayout: "fixed" }}>
                        <thead>
                          <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {nftHistory.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td
                                  width="35%"
                                  style={{
                                    overflow: "hidden",
                                    extOverflow: "ellipsis",
                                    whiteSpace: "wrap",
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {item.from.slice(0, 7)}...
                                  {item.from.slice(35)}
                                </td>
                                <td
                                  width="35%"
                                  style={{
                                    overflow: "hidden",
                                    extOverflow: "ellipsis",
                                    whiteSpace: "wrap",
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {item.to.slice(0, 7)}...
                                  {item.to.slice(35)}
                                </td>
                                <td
                                  width="30%"
                                  style={{
                                    overflow: "hidden",
                                    extOverflow: "ellipsis",
                                    whiteSpace: "wrap",
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {item.createdAt}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </div>
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
      {Loadingfunc(Loading)}
    </>
  );
};

export default NftDetails;

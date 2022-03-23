import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import CommonSection from "../ui/CommonSection";

import MyNfts from "../ui/myModal/MyNfts";
import MyRanking from "../ui/myModal/MyRanking";
import EditProfile from "../ui/myModal/EditProfile";

import "./mypage.css";
import pfpImg from "../../assets/images/img.jpg";

const MyPage = () => {
  const [nickname, setNicname] = useState("noname");
  const [email, setEmail] = useState("no-email");
  const [address, setAddress] = useState("address");

  const [MyNftModal, setMyNftModal] = useState(false);
  const [MyRankingModal, setMyRankingModal] = useState(false);
  const [EditProfileModal, setEditProfileModal] = useState(false);

  return (
    <>
      <CommonSection title="My Profile" />

      <div className="my__page">
        {/* 여기에는 프로필카드 들어갈 예정 */}
        <div className="card__profile">
          <div className="upper__container">
            <div className="pfp__container">
              <img src={pfpImg} alt="pfp" style={{ position: "absolute" }} />
            </div>
          </div>
          <div className="lower__container">
            <h3>{nickname}</h3>
            <h4>{email}</h4>
            <p>{address}</p>
            <button
              className="pfp__button"
              onClick={() => setEditProfileModal(true)}
            >
              Edit Profile
            </button>
            {EditProfileModal && (
              <EditProfile setShowModal={setEditProfileModal} />
            )}
          </div>
        </div>
        {MyNftModal && <MyNfts setShowModal={setMyNftModal} />}
        {MyRankingModal && <MyRanking setShowModal={setMyRankingModal} />}
        <div className="my__nft">
          <Row className="mypage__btn">
            <Col xs="12" className="mypage__li">
              <div className="nft_content">
                <button
                  className="mynft__btn"
                  onClick={() => setMyNftModal(true)}
                >
                  <span className="nft__icon">
                    <i className="ri-vip-diamond-line"></i>
                  </span>
                  <span className="nft__title">My NFTs</span>
                </button>
              </div>
            </Col>

            <Col xs="12" className="mypage__li">
              <div className="ranking_content">
                <button
                  className="myRanking__btn"
                  onClick={() => setMyRankingModal(true)}
                >
                  <span className="ranking__icon">
                    <i className="ri-sort-asc"></i>
                  </span>
                  <span className="ranking__title">My Ranking</span>
                </button>
              </div>
            </Col>

            <Col xs="12" className="mypage__li">
              <div className="market_content">
                <Link to="/market">
                  <span className="market__icon">
                    <i className="ri-store-2-line"></i>
                  </span>
                  <span className="ranking__title">NFT Market</span>
                </Link>
              </div>
            </Col>

            {/* <Col xs="4">
              <div className="edit_content">
                <button
                  className="editProfile__btn"
                  onClick={() => setEditProfileModal(true)}
                >
                  <span className="profile__icon">
                    <i className="ri-profile-line"></i>
                  </span>
                  <span className="profile__title">Edit Profile</span>
                </button>
              </div>
            </Col> */}

            <Col xs="12" className="mypage__li">
              <div className="gogame_content">
                <Link to="/game">
                  <span className="gogame__icon">
                    <i className="ri-play-fill"></i>
                  </span>
                  <span className="gogame__title">Start Game</span>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div>
        {/* <Col>
          <div className="mypage__infobox">
            <div className="user__nick__Nfts"></div>
          </div>
        </Col> */}
      </div>
    </>
  );
};

export default MyPage;

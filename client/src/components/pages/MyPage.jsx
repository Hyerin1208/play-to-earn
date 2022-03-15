import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import user__bg from "../../assets/images/user_bg.png";
import CommonSection from "../ui/CommonSection";

import MyNfts from "../ui/myModal/MyNfts";
import MyRanking from "../ui/myModal/MyRanking";
import EditProfile from "../ui/myModal/EditProfile";

import "./mypage.css";

const MyPage = () => {
  const [userBackImage, setUserBackImage] = useState(user__bg);

  const [MyNftModal, setMyNftModal] = useState(false);
  const [MyRankingModal, setMyRankingModal] = useState(false);
  const [EditProfileModal, setEditProfileModal] = useState(false);

  const imageHandler = (e) => {
    if (e.target.file[0]) {
      setUserBackImage(e.target.file[0]);
    }
  };

  return (
    <>
      <CommonSection title="Contact" />
      <div className="my__page">
        <div className="mypage__container">
          <h1 className="my__heading">Change your NFT</h1>
          <div className="img-holder">
            <img src={userBackImage} alt="" id="img" className="img" />
          </div>
          <input
            type="file"
            name="image-upload"
            id="input"
            accept="image/*"
            onChange={imageHandler}
          />
          <div className="label">
            <label htmlFor="input" className="image-upload">
              <i className="ri-image-add-fill"></i>
              Choose your NFT
            </label>
          </div>
        </div>
        <div className="my__nft">
          <Row>
            <Col xs="4">
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
                {MyNftModal && <MyNfts setShowModal={setMyNftModal} />}
              </div>
            </Col>
            <Col xs="8">
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
                {MyRankingModal && (
                  <MyRanking setShowModal={setMyRankingModal} />
                )}
              </div>
            </Col>
            <Col xs="4">
              <div className="edit_content">
                <button
                  className="editProfile__btn"
                  onClick={() => setEditProfileModal(true)}
                >
                  <span className="profile__icon">
                    <i className="ri-profile-line"></i>
                  </span>
                  <span className="profile__title">Edit Profile</span>
                  {EditProfileModal && (
                    <EditProfile setShowModal={setEditProfileModal} />
                  )}
                </button>
              </div>
            </Col>
            <Col xs="8">
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

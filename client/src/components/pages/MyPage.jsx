import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import user__bg from "../../assets/images/user_bg.png";
import CommonSection from "../ui/CommonSection";

import "./mypage.css";

const MyPage = () => {
  const [userBackImage, setUserBackImage] = useState(user__bg);

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
                <span className="nft__icon">
                  <i className="ri-vip-diamond-line"></i>
                </span>
                <span className="nft__title">My NFTs</span>
              </div>
            </Col>
            <Col xs="8">
              <div className="ranking_content">
                <span className="ranking__icon">
                  <i className="ri-sort-asc"></i>
                </span>
                <span className="ranking__title">My Ranking</span>
              </div>
            </Col>
            <Col xs="4">
              <div className="edit_content">
                <span className="profile__icon">
                  <i className="ri-profile-line"></i>
                </span>
                <span className="profile__title">Edit Profile</span>
              </div>
            </Col>
            <Col xs="8">
              <div className="gogame_content">
                <span className="gogame__icon">
                  <i className="ri-play-fill"></i>
                </span>
                <span className="gogame__title">Start Game</span>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default MyPage;

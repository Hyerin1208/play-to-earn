import React, { useState } from "react";
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
          <h1 className="my__heading">Change your Nft</h1>
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
      </div>
    </>
  );
};

export default MyPage;

import { useState } from "react";
import user__bg from "../../../assets/images/user_bg.png";

import "./edit-profile.css";

const EditProfile = ({ setShowModal }) => {
  const [userBackImage, setUserBackImage] = useState(user__bg);

  const imageHandler = (e) => {
    if (e.target.file[0]) {
      setUserBackImage(e.target.file[0]);
    }
  };

  return (
    <div className="nft_wrapper">
      <div className="editpfp_modal">
        <span className="closed_modal">
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <div className="mypage__container">
          <h2 className="my__heading">Change your NFT</h2>
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
          <div className="editProfile__contents">
            <input
              className="edit__name"
              placeholder="edit your name"
              type="text"
            />
            <br />
            <input
              className="edit__email"
              placeholder="edit your email"
              type="text"
            />
          </div>
          <button className="editpfp__btn">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

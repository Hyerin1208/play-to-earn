import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, NavItem, Table } from "reactstrap";
import EditProfile from "../myModal/EditProfile";
import pfpImg from "../../../assets/images/img.jpg";

import axios from "axios";

import "./slide-bar.css";
import { useSelector } from "react-redux";

const SideBar = (props) => {
  const [nickname, setNicName] = useState("noname");
  const [email, setEmail] = useState("no-email");
  const [address, setAddress] = useState("address");

  const Account = useSelector((state) => state.AppState.account);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  const [EditProfileModal, setEditProfileModal] = useState(false);

  const getJoinus = async () => {
    await axios.get("http://localhost:5000/user/login").then((response) => {
      console.log(response);
      setNicName(response.data[0].nick);
      setEmail(response.data[0].email);
      console.log(response.data[0].email);
    });
  };

  const updateProfile = async () => {
    await axios.post("http://localhost:5000/user/edit");
  };

  // const getPfp = (id) => {
  //   const profile = this.state.Alldata.find((item) => item.id === id);
  //   return profile;
  // };

  // const onEdit = (id) => {
  //   const tempProfile = this.state.Alldata;
  //   const index = tempProfile.indexOf(this.getPfp(id));
  //   const selectProfile = tempProfile[index];
  //   this.setState({
  //     nick: selectProfile["nick"],
  //     email: selectProfile["email"],
  //   });
  // };

  const onSubmit = (id) => {
    props.history.push({
      pathname: "/edit" + id,
    });
  };

  return (
    <div className="slide__container">
      <div className="pfpside__box">
        {/* <div className="profile__pic">
          <button id="select__pfp" onClick={() => setEditProfileModal(true)}>
            <label className="-label">
              <i className="ri-gallery-upload-line"></i>
              <span>Change Profile</span>
            </label>
            <img
              src=""
              id="upload__pfp"
              // onChange="loadFile(event)"
              alt="edit"
            />
          </button>
          {EditProfileModal && (
            <EditProfile setShowModal={setEditProfileModal} />
          )}
        </div> */}

        {/* <img
          className="pfp__iamge"
          src={pfpImg}
          alt="pfp"
          // style={{ position: "absolute", width: "40px" }}
        /> */}

        <div>{nickname}</div>
        <div>{email}</div>

        <input
          className="edit__name"
          placeholder="edit your name"
          type="text"
          value="nickName"
          onChange={(e) => {
            setNicName(e.target.value);
          }}
        />
        <br />
        <input
          className="edit__email"
          placeholder="edit your email"
          type="email"
          value="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button onClick={() => onSubmit()}>Submit</button>

        {/* {(value) => {
          return (
            <>
              <div>{nickname}</div>
              <div>{email}</div>
              <button
                className="edit__mytext"
                onClick={() => {
                  value.onEdit(value.id);
                }}
              >
                {value.id ? "Save" : "Add"}
                수정하기
              </button>
              <input
                className="edit__name"
                placeholder="edit your name"
                type="text"
                vlaue={value.nick}
                onChange={(e) => {
                  value.updateValue(e, "nickname");
                }}
              />
              <br />
              <input
                className="edit__email"
                placeholder="edit your email"
                type="email"
                vlaue={value.email}
                onChange={(e) => {
                  value.updateValue(e, "email");
                }}
              />
              <buttom>수정완료</buttom>
            </>
          );
        }} */}
        <button
          className="show__btn"
          onClick={() => getJoinus()}
          style={{ width: "120px" }}
        >
          Get Data(test_btn)
        </button>

        <div className="myBset__ranking" content="">
          My Ranking
        </div>
      </div>
      <div className="link__conatainer">
        <div className="nav__itemBox">
          <button className="slide__button">
            <span className="edit__icon">
              <i className="ri-edit-2-line">
                <h5>Edit Profile</h5>
              </i>
            </span>
          </button>

          <button className="slide__button">
            <span className="slide__icon">
              <Link to="/market">
                <i className="ri-store-2-line">
                  <h5>NFT Market</h5>
                </i>
              </Link>
            </span>
          </button>
          <button className="slide__button">
            <span className="slide__icon">
              <Link to="/game">
                <i className="ri-gamepad-line">
                  <h5>Start Game</h5>
                </i>
              </Link>
            </span>
          </button>
          <p>Having troubles?</p>
          <button className="contact__button">
            <span className="slide__icon">
              <Link to="/contact">
                <i className="ri-contacts-book-line">
                  <h5>Contact Us</h5>
                </i>
              </Link>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, NavItem, Table } from "reactstrap";
import EditProfile from "../myModal/EditProfile";
import pfpImg from "../../../assets/images/img.jpg";
import ReactLoaing from "react-loading";
import Badge from "react-bootstrap/Badge";

import axios from "axios";

import "./slide-bar.css";
import { useSelector } from "react-redux";

const SideBar = () => {
  const [nickname, setNicName] = useState([]);
  const [email, setEmail] = useState([]);
  // const [address, setAddress] = useState("address");
  const [Loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const account = useSelector((state) => state.AppState.account);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  const [EditProfileModal, setEditProfileModal] = useState(false);

  useEffect(() => {
    if (account !== null) {
      console.log("실행");

      axios
        .post("http://localhost:5000/user/login", {
          address: account,
        })
        .then((res) => {
          console.log(res.data.nick);
          setNicName(res.data.nick);
          setEmail(res.data.email);
        })
        .catch((err) => {
          console.log(err);
        });

      setLoading(null);
    }
  }, [account]);

  // const updateProfile = async () => {
  //   await axios.post("http://localhost:5000/user/edit").then();
  // };

  const onSubmit = async () => {
    const nick = document.getElementById("nick__pfp").innerText;
    const email = document.getElementById("email__pfp").innerText;
    await axios.post("http://localhost:5000/user/edit", {
      nick: nick,
      email: email,
      address: account,
    });
  };

  const updatedProfile = { nickname, email };

  if (Loading) {
    return (
      <div>
        잠시만 기다려 주세요
        <ReactLoaing type={"bars"} color={"purple"} height={375} width={375} />
      </div>
    );
  } else {
    return (
      <div className="slide__container">
        <div className="pfpside__box">
          {/* 여기부터 프로필 이미지 수정 */}
          <div className="profile__pic">
            <button id="select__pfp" onClick={() => setEditProfileModal(true)}>
              <label className="-label">
                <i className="ri-gallery-upload-line"></i>
                <span>Change Profile</span>
              </label>
              <img
                className="pfp__iamge"
                src={pfpImg}
                id="upload__pfp"
                // onChange="loadFile(event)"
                alt="edit"
              />
            </button>
            {EditProfileModal && (
              <EditProfile setShowModal={setEditProfileModal} />
            )}
          </div>
          {/* 여기서부터 닉넴 이메일 수정 */}
          <div className="mypfp__Container">
            <div className="nick__pfp" id="nick__pfp">
              {nickname}
            </div>
            <div className="email__pfp" id="email__pfp">
              {email}
            </div>
          </div>

          {visible && (
            <>
              <input
                className="edit__name"
                placeholder="edit your name"
                type="text"
                value={nickname}
                onChange={(e) => {
                  setNicName(e.target.value);
                }}
              />
              <input
                className="edit__email"
                placeholder="edit your email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <button className="submit__btn" onClick={() => onSubmit()}>
                Submit
              </button>
            </>
          )}

          <button
            className="visible__btn"
            onClick={() => {
              setVisible(!visible);
            }}
          >
            {visible ? "Exit" : "Edit"}
            {/* Edit */}
          </button>

          <div className="myBest__ranking" content="">
            <Badge pill bg="light" text="dark" className="my__Badge">
              <p>My Ranking</p>
            </Badge>
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
  }
};

export default SideBar;

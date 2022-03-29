import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, NavItem } from "reactstrap";

import pfpImg from "../../../assets/images/img.jpg";

import "./slide-bar.css";

const SideBar = () => {
  const [nickname, setNicname] = useState("noname");
  const [email, setEmail] = useState("no-email");
  const [address, setAddress] = useState("address");

  const [EditProfileModal, setEditProfileModal] = useState(false);

  return (
    <div className="slide__container">
      <div className="pfpside__box">
        <img
          className="pfp__iamge"
          src={pfpImg}
          alt="pfp"
          // style={{ position: "absolute", width: "40px" }}
        />

        <div className="profile__name">
          {nickname}
          <br />
          {email}
        </div>
        <div className="myBset__ranking" content="">
          My Ranking
        </div>
      </div>
      <div className="link__conatainer">
        <div className="nav__itemBox">
          <button
            className="slide__button"
            onClick={() => setEditProfileModal(true)}
          >
            <span className="edit__icon">
              <i className="ri-edit-2-line">
                <h5>Edit Profile</h5>
              </i>
            </span>
          </button>
          <button
            className="slide__button"
            onClick={() => setEditProfileModal(true)}
          >
            <span className="slide__icon">
              <Link to="/market">
                <i className="ri-store-2-line">
                  <h5>NFT Market</h5>
                </i>
              </Link>
            </span>
          </button>
          <button
            className="slide__button"
            onClick={() => setEditProfileModal(true)}
          >
            <span className="slide__icon">
              <Link to="/game">
                <i className="ri-gamepad-line">
                  <h5>Start Game</h5>
                </i>
              </Link>
            </span>
          </button>
          <p>Having troubles?</p>
          <button
            className="contact__button"
            onClick={() => setEditProfileModal(true)}
          >
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

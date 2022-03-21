import React from "react";

import "./side-bar.css";

const SideBar = () => {
  return (
    <>
      <div className="sidebar__btn">
        <a href="#" className="github">
          Github
          <i className="ri-github-fill" />
        </a>
        <a href="#" className="discord">
          Discord
          <i className="ri-discord-fill" />
        </a>
        <a href="#" className="kakaoTalk">
          KakaoTalk
          <i className="ri-kakao-talk-fill" />
        </a>
      </div>
    </>
  );
};

export default SideBar;

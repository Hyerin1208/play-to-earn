import React from "react";

import "./side-bar.css";

const SideBar = () => {
  return (
    <>
      <div className="sidebar__btn">
        <a
          href="https://github.com/NamingCenter/play-to-earn"
          className="github"
        >
          Github
          <i className="ri-github-fill" />
        </a>
        <a
          href="https://discord.com/channels/968044352901365790/968044352901365792"
          className="discord"
        >
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

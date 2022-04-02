import React from "react";
import { Container } from "reactstrap";

import ScrollToTop from "react-scroll-to-top";

import MainSection from "../../ui/mainContents/MainSection";
import LiveList from "../../ui/mainContents/LiveList";
import Members from "../../ui/mainContents/Members";
import Tutorial from "../../ui/mainContents/Tutorial";
import TokenNomic from "../../ui/mainContents/TokenNomic";
import AirDrop from "../../ui/mainContents/AirDrop";
import NewsLetter from "../../ui/mainContents/NewsLetter";
import SideBar from "../../ui/mainContents/SideBar";

const Home = () => {
  return (
    <>
      <ScrollToTop smooth top="20" />
      <SideBar />
      <MainSection />
      <AirDrop />
      <LiveList />
      <TokenNomic />
      <Tutorial />
      <Members />
      <NewsLetter />
    </>
  );
};

export default Home;

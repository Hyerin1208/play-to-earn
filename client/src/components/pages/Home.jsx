import React from "react";
import { Container } from "reactstrap";

import MainSection from "../ui/MainSection";
import LiveList from "../ui/LiveList";
import Members from "../ui/Members";
import Tutorial from "../ui/Tutorial";
import TokenNomic from "../ui/TokenNomic";
import AirDrop from "../ui/AirDrop";

const Home = () => {
  return (
    <>
      <MainSection />
      <AirDrop />
      <LiveList />
      <Tutorial />
      <TokenNomic />
      <Members />
    </>
  );
};

export default Home;

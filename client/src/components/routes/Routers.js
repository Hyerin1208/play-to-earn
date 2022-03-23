import React, { Fragment } from "react";

import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Market from "../pages/Market";
import Create from "../pages/Create";
import Contact from "../pages/Contact";
import MyPage from "../pages/MyPage";
import EditProfile from "../pages/EditProfile";
import Wallet from "../pages/Wallet";
import NftDetails from "../pages/NftDetails";
import Game from "../pages/Game";
import Ranking from "../pages/Ranking";
import Test from "../pages/Test";
import Error from "../ui/Error404";

const Routers = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/create" element={<Create />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/market/:card_id" element={<NftDetails />} />
        <Route path="/game/*" element={<Game />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/test" element={<Test />} />
        {/* <Route path="/error" element={<Error />} /> */}
        <Route component={<Error />} />
      </Routes>
    </Fragment>
  );
};

export default Routers;

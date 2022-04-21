import React, { Fragment } from "react";

import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Market from "../pages/Market/Market";
import Create from "../pages/Market/Create";
import Contact from "../pages/Contact/Contact";
import MyPage from "../pages/Mypage/MyDash";
import EditProfile from "../pages/Mypage/EditProfile";
import Wallet from "../pages/Wallet/Wallet";
import NftDetails from "../pages/Market/NftDetails";
import Game from "../pages/Game/Game";
import Ranking from "../pages/Game/Ranking";
import Test from "../pages/Test";
import Error from "../ui/templete/Error404";
import JoinUs from "../ui/register/JoinUs";
import Admin from "../pages/Admin/Admin";
import Evolution from "../pages/Evolution/Evolution";

const Routers = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/market" element={<Market />} />
        <Route path="/detailes/:card_id" element={<NftDetails />} />
        <Route path="/create" element={<Create />} />
        <Route path="/join/*" element={<JoinUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/game/*" element={<Game />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/upgrade" element={<Evolution />} />
        <Route path="/test" element={<Test />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </Fragment>
  );
};

export default Routers;

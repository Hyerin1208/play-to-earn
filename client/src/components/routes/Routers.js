import React, { Fragment } from "react";

import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Market from "../pages/Market";
import Create from "../pages/Create";
import Contact from "../pages/Contact";
import SellerProfile from "../pages/SellerProfile";
import EditProfile from "../pages/EditProfile";
import Wallet from "../pages/Wallet";
import NftDetails from "../pages/NftDetails";
import Game from "../pages/Game";
import SnakeGames from "../pages/SnakeGame/SnakeGame";
import TetrisGames from "../pages/TetrisGame/Tetris.js";

const Routers = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/create" element={<Create />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/seller-profile" element={<SellerProfile />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/market/:id" element={<NftDetails />} />
        <Route path="/game/*" element={<Game />} />
      </Routes>
    </Fragment>
  );
};

export default Routers;

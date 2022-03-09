import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Market from "../pages/Market";
import Create from "../pages/Contact";
import Contact from "../pages/Contact";
import SellerProfile from "../pages/SellerProfile";
import EditProfile from "../pages/EditProfile";
import Wallet from "../pages/Wallet";
import NftDetails from "../pages/NftDetails";
import SnakeGame from "../pages/SnakeGame/SnakeGame";
// import Game from "../pages/Game";

const Routers = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/market" element={<Market />} />
            <Route path="/create" element={<Create />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/seller-profile" element={<SellerProfile />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/market/:id" element={<NftDetails />} />
            <Route path="/game" element={<SnakeGame />} />
            {/* <Route path="/game" element={<Game />} /> */}
        </Routes>
    );
};

export default Routers;

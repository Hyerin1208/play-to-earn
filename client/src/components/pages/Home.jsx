import React from "react";
import { Container } from "reactstrap";

import MainSection from "../ui/MainSection";
import LiveList from "../ui/LiveList";
import Members from "../ui/Members";
import Tutorial from "../ui/Tutorial";

const Home = () => {
    return (
        <>
            <MainSection />
            <LiveList />
            <Tutorial />
            <Members />
        </>
    );
};

export default Home;

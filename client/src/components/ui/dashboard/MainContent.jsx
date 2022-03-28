import React, { Fragment } from "react";
import { Col, Container, Navbar } from "reactstrap";
import Earnings from "./Earnings";

import "./main-container.css";
import MyLikes from "./MyLikes";
import MyRanking from "./MyRanking";

const MainContent = () => {
  return (
    <Fragment>
      <div className="main__dash">
        <Navbar />
        <div className="sub__container">
          <div className="section__one">
            <Col className="col__one1">
              <Earnings />
            </Col>
            <Col className="col__one2">
              <MyRanking />
            </Col>
            <Col className="col__one3">
              <MyLikes />
            </Col>
          </div>
          <div className="section__two">
            <Col className="col__two1"></Col>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MainContent;

import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import Earnings from "./Earnings";
import ReactLoaing from "react-loading";

import "./main-container.css";
import MyLikes from "./MyLikes";
import MyRanking from "./MyRanking";

import MySlick from "./MySlick";
import MySellList from "./MySellList";
import { MyWrapper } from "./MyWrapper"; // slick css

const MainContent = () => {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(null);
  }, []);

  if (Loading) {
    return (
      <div>
        잠시만 기다려 주세요
        <ReactLoaing type={"bars"} color={"purple"} height={600} width={375} />
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div className="main__dash">
          {/* <Navbar /> */}
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
            <Row>
              {/* 내가 소유하고 있는 NFTs */}
              <h4>Collected</h4>
              <br />
              <div className="section__two">
                <MyWrapper>
                  <MySlick />
                </MyWrapper>
              </div>
              <br />

              {/* 내가 만든 NFTs */}
              <h4>SellList</h4>
              <br />
              <div className="section__two">
                <MyWrapper>{/* <MySellList /> */}</MyWrapper>
              </div>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default MainContent;

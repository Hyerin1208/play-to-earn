import React, { Fragment, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import Earnings from "./Earnings";

import "./main-container.css";
import MyLikes from "./MyLikes";
import MyRanking from "./MyRanking";

import "./myslick.css";
import Slider from "react-slick";

import MySellCard from "./MySellCard";
import { MyWrapper } from "./MyWrapper"; // slick css
import { useSelector } from "react-redux";
import SellModal from "../templete/SellModal";
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";

const MainContent = () => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #5900ff;
    width: 100%;
    height: 100%;
    background: #34343465;
  `;
  const [showModal, setShowModal] = useState(false);
  const [checkChange, setCheckChange] = useState(false);

  const [Loading, setLoading] = useState(true);
  const [mylists, setMylists] = useState([]);
  const [selllists, setSelllists] = useState([]);
  const MyModal = useSelector((state) => state.AppState.MyModal);
  const MyNFTlists = useSelector((state) => state.AppState.MyNFTlists);

  useEffect(() => {
    setShowModal(MyModal.MyModal);
  }, [MyModal]);

  useEffect(() => {
    if (MyNFTlists.length !== 0) {
      setMylists(MyNFTlists);
      const selllists = MyNFTlists.filter((lists) => {
        if (lists.formInput.sell === true) {
          return true;
        }
      });
      setSelllists(selllists);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [MyNFTlists, checkChange]);

  const settings = {
    draggable: true,
    accessibility: true,
    centerMode: false,
    variableWidth: true,
    slidesToShow: 1,
    arrows: true,
    dots: true,
    swipeToSlide: true,
    infinite: false,
  };

  return (
    <React.Fragment>
      {Loading ? (
        <div
          className={Loading ? "parentDisable" : ""}
          width="100%"
          height="100%"
        >
          <div className="overlay-box">
            <FadeLoader
              size={150}
              color={"#ffffff"}
              css={override}
              loading={Loading}
              z-index={"1"}
              text="Loading your content..."
            />
          </div>
        </div>
      ) : (
        false
      )}
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
            <div>
              {/* 아래는 옵션 정보 */}
              <h4 data-text="boost"></h4>
            </div>
            <div className="section__two">
              <MyWrapper>
                <div className="slick-arrow">
                  <Slider {...settings} style={{ width: 900 }}>
                    {mylists.map((items, index) => {
                      return (
                        <Fragment key={index}>
                          <Col key={index} className="my-items">
                            <MySellCard
                              item={items}
                              setCheckChange={setCheckChange}
                              checkChange={checkChange}
                            />
                          </Col>
                        </Fragment>
                      );
                    })}
                  </Slider>
                </div>
              </MyWrapper>
            </div>
            <br />

            {/* 내가 만든 NFTs */}
            <h4>SellList</h4>
            <br />
            <div className="section__two">
              <MyWrapper>
                <div className="slick-arrow">
                  <Slider {...settings} style={{ width: 900 }}>
                    {selllists.map((items, index) => {
                      return (
                        <Fragment key={index}>
                          <Col key={index} className="my-items">
                            <MySellCard
                              item={items}
                              setCheckChange={setCheckChange}
                              checkChange={checkChange}
                              setLoading={setLoading}
                            />
                          </Col>
                        </Fragment>
                      );
                    })}
                  </Slider>
                </div>
              </MyWrapper>
            </div>
          </Row>
        </div>
      </div>
      {showModal && (
        <SellModal
          item={MyModal}
          setShowModal={setShowModal}
          setCheckChange={setCheckChange}
          checkChange={checkChange}
          setLoading={setLoading}
        />
      )}
    </React.Fragment>
  );
};

export default MainContent;

import React, { Fragment, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import Earnings from "./Earnings";
import ReactLoaing from "react-loading";

import "./main-container.css";
import MyLikes from "./MyLikes";
import MyRanking from "./MyRanking";

import "./myslick.css";
import Slider from "react-slick";

import MySellCard from "./MySellCard";
import { MyWrapper } from "./MyWrapper"; // slick css
import { useSelector } from "react-redux";
import SellModal from "../templete/SellModal";

const MainContent = () => {
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
    setLoading(null);
  }, []);

  useEffect(() => {
    if (MyNFTlists.length !== 0) {
      console.log(MyNFTlists);
      setMylists(MyNFTlists);
      const selllists = MyNFTlists.filter((lists) => {
        if (lists.formInput.sell === true) {
          return true;
        }
      });
      console.log(selllists);
      setSelllists(selllists);
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
          />
        )}
      </React.Fragment>
    );
  }
};

export default MainContent;

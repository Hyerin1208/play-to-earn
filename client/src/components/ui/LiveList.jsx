import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./live-list.css";

import img01 from "../../assets/images/q1.png";
import admin from "../../assets/images/avatar.png";

const LiveList = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-4">
            <div className="live__list__top">
              <h3>Top collections over last 7 days</h3>
              <span>
                <Link to="/market">Explor more</Link>
              </span>
            </div>
          </Col>

          <Col lg="3">
            <div className="single__nft__card">
              <div className="nft__img">
                <img src={img01} alt="" />
              </div>

              <div className="nft__content">
                <h5 className="nft__title">Stitch Club</h5>

                <div className="creator__info-wrapper">
                  <div className="creator__img">
                    <img src={admin} alt="" />
                  </div>
                  <div className="creator__info">
                    <div className="creator">
                      <h6>Created By</h6>
                      <p>ALTAVA Group</p>
                    </div>

                    <div className="bid">
                      <h6>Current Bid</h6>
                      {/* 우리만의 토큰이름을 정해서 아래단위 바꾸기 */}
                      <p>4.89 EHT</p>
                    </div>
                  </div>
                </div>

                <div className="bid__box">
                  <button className="bid__btn">
                    <i className="ri-shopping-bag-line"></i>
                    Place Bid
                  </button>

                  <span className="view__link">
                    <Link to="#">View More</Link>
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default LiveList;

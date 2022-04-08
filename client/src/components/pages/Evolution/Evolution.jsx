import React, { Fragment } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

import "./evolution.css";

import temporaryData from "../../../assets/images/free.png";
import EvoDetails from "./EvoDetails";
import { Col, Row } from "reactstrap";

const Evolution = (props) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  return (
    <Fragment>
      <Row>
        <Col md="5">
          <div className="card__wrapper">
            <motion.div
              className="card__container"
              style={{ x, y, rotateX, rotateY, z: 100 }}
              drag
              dragElastic={0.16}
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              whileTap={{ cursor: "grabbing" }}
            >
              <div className="top__container">
                <div className="circle__wrapper">
                  <div className="circle__cir"></div>
                </div>
                <div className="evolution__wrapper">
                  <motion.div
                    className="evolution__evo"
                    style={{
                      x,
                      y,
                      rotateX,
                      rotateY,
                      rotate: "-13deg",
                      z: 10000,
                    }}
                  >
                    <div className="upload__evo">
                      <i className="ri-add-circle-line"></i>
                    </div>
                    {/* <img src={temporaryData} alt="" /> */}
                  </motion.div>
                </div>
                <div className="evolu__text">Naming Center</div>
              </div>

              <div className="bottom__container">
                <EvoDetails />
                <div className="evolu__details" />
              </div>
            </motion.div>
          </div>
        </Col>

        <Col md="2">
          <div className="right__arrows">
            <i className="ri-arrow-right-line"></i>
          </div>
          <br />
          <div className="evolution__nfts">
            <div className="card__content">
              <div className="earning__chart">
                <i className="ri-copper-diamond-line"></i>
              </div>
              <div className="earing__text">
                <div className="token__mybox"> 2,000,000 Token</div>
                <div className="token__mydesc">Balance</div>
              </div>
            </div>
          </div>
        </Col>
        <Col md="5"></Col>
      </Row>
    </Fragment>
  );
};

export default Evolution;

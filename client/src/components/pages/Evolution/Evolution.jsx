import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import styled from "styled-components";

import "./evolution.css";

import temporaryData from "../../../assets/images/free.png";
import EvoDetails from "./EvoDetails";

const Evolution = (props) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  return (
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
              style={{ x, y, rotateX, rotateY, rotate: "-23deg", z: 10000 }}
            >
              <img src={temporaryData} alt="" />
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
  );
};

export default Evolution;

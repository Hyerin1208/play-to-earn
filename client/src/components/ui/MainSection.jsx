import React from "react";
import { motion } from "framer-motion";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./main-section.css";

// import mainImg from "../../assets/images/Medusa.png";
import Hero1 from "../../assets/images/mainImg/char.png";
import Hero2 from "../../assets/images/mainImg/char1.png";
import Hero3 from "../../assets/images/mainImg/char2.png";
import Hero4 from "../../assets/images/mainImg/char3.png";

const MainSection = () => {
  const fadeLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="main__section">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="main__content">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Discover rare digital art and collect
                <span>sell extraordinary</span>NFTs
              </motion.h2>
              <motion.p
                variants={fadeLeft}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
              >
                The Marketplace- an extremely bustling place - a place for
                players to exchange and trade the items they own.
              </motion.p>
              <div className="main__btns">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95, backgroundColor: "#5142fc" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 1.5 } }}
                  className="join__btn"
                >
                  <i className="ri-registered-line"></i>
                  <Link to="/join"> Join Us</Link>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{
                    scale: 0.95,
                    backgroundColor: "#5142fc",
                    border: "none",
                    color: "#000",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 1.5 } }}
                  className="join__btn"
                >
                  <i className="ri-gamepad-line"></i>
                  <Link to="/game"> Play Game</Link>
                </motion.button>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="main__img">
              {/* <img src={mainImg} alt="" /> */}
              <motion.img
                src={Hero3}
                alt="hero3"
                className="hero"
                whileHover={{ scale: 0.9 }}
                drag={true}
                dragConstraints={{ left: 0, right: 250, top: 0, bottom: 50 }}
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
              />
              <motion.img
                src={Hero2}
                alt="hero2"
                className="hero"
                whileHover={{ scale: 0.6 }}
                drag={true}
                dragConstraints={{ left: 50, right: 0, top: 0, bottom: 50 }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
              />
              <motion.img
                src={Hero4}
                alt="hero4"
                className="hero"
                whileHover={{ scale: 0.8 }}
                drag={true}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 250 }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
              />
              <motion.img
                src={Hero1}
                alt="hero1"
                className="hero"
                whileHover={{ scale: 0.7 }}
                drag={true}
                dragConstraints={{ left: 0, right: 0, top: 50, bottom: 500 }}
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainSection;

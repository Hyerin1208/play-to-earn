import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./live-list.css";

import NftCard from "./NftCard";
import { NFT__DATA } from "../../assets/data/data.js";

const LiveList = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="live__list__top">
              <h3>Top collections over last 7 days</h3>
              <span>
                <Link to="/market">Explor more</Link>
              </span>
            </div>
          </Col>

          {NFT__DATA.slice(0, 4).map((item, index) => (
            <Col lg="3" key={index}>
              <NftCard key={item.id} item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default LiveList;

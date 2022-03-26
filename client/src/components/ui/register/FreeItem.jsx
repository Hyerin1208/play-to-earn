import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

import { FREE__ITEMS } from "../../../assets/data/freeNft";

import "./free-item.css";
import FreeCard from "./FreeCard";

const FreeItem = () => {
  const [checkItem, setCheckItem] = useState(null);

  return (
    <div>
      <Container>
        <Row>
          <Col lg="12" className="mb-3">
            <div className="free__list__top">
              <h3>Free Nft Character</h3>
              <h5>You must choose one of them</h5>
            </div>
          </Col>

          {FREE__ITEMS.slice(0, 4).map((item, index) => (
            <Col lg="3" md="4" sm="6" key={index} className="mb-4">
              <FreeCard
                key={item.id}
                check={{ checkItem: checkItem, setCheckItem: setCheckItem }}
                item={item}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <div className="btn__container">
        <Link to="/join/step2">Next</Link>
      </div>
    </div>
  );
};

export default FreeItem;

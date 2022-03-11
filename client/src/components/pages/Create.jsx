import React from "react";

import { Container, Row, Col } from "reactstrap";
import "./create.css";

import CommonSection from "../ui/CommonSection";
import NftCard from "../ui/NftCard";
import img from "../../assets/images/img.jpg";
import admin from "../../assets/images/avatar.png";

const item = {
  id: "1",
  title: "Guard",
  desc: "원숭이",
  imgUrl: img,
  creator: "ALTAVA Group",
  creatorImg: admin,
  currentBid: 5.89,
};

const Create = () => {
  return (
    <>
      <CommonSection title="Create Item" />

      <div className="create__box">
        <Container>
          <Row>
            <Col lg="3" md="4" sm="6">
              <h5>Preview Item</h5>
              <NftCard item={item} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Create;

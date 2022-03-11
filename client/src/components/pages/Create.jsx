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
              <h5 className="preview__item">Preview Item</h5>
              <NftCard item={item} />
            </Col>

            <Col lg="9" md="8" sm="6">
              <div className="create__input">
                <form>
                  <div className="form__input">
                    <label htmlFor="">Upload File</label>
                    <input type="file" className="upload__input" />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Price</label>
                    <input
                      type="number"
                      placeholder="Enter price for one item (ETH)"
                    />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Minimum Bid</label>
                    <input type="number" placeholder="Enter minimum bid" />
                  </div>

                  <div className="date__form">
                    <div className="form__input w-50">
                      <label htmlFor="">Starting Date</label>
                      <input type="date" />
                    </div>

                    <div className="form__input w-50">
                      <label htmlFor="">Expiration Date</label>
                      <input type="date" />
                    </div>
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Title</label>
                    <input type="text" placeholder="Enter title" />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Description</label>
                    <textarea
                      name=""
                      id=""
                      rows="10"
                      placeholder="Enter Description"
                      className="w-100"
                    ></textarea>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Create;

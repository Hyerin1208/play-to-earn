import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import ReactLoaing from "react-loading";

import AdminInfo from "./AdminInfo";
import Accept from "./Accept";
import OwnerSellList from "./OwnerSellList";

import "./admin.css";

const Admin = () => {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(null);
  }, []);

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
        <Container
          style={{
            display: "flex",
            height: " 120vh",
            background:
              "linear-gradient(to bottom right, white 0%, # e6e4ff 70%)",
            borderRadius: "2rem",
            marginBottom: "10px",
          }}
        >
          <div className="admin__dash">
            <div className="sub__container2">
              <div className="section1__one">
                <Col xs="4">
                  <AdminInfo />
                </Col>
                <Col xs="8">
                  <Accept />
                </Col>
              </div>
              <Row>
                <div className="section2__two">
                  <Col>
                    <h5>작명소's All Nfts</h5>
                    <OwnerSellList />
                  </Col>
                </div>
              </Row>
            </div>
          </div>
        </Container>
      </React.Fragment>
    );
  }
};

export default Admin;

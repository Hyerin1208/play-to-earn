import React from "react";
import "./members.css";
import { Container, Row, Col } from "reactstrap";

// import member from "../../assets/images/member.png";
import { MEMBER__DATA } from "../../assets/data/data";

const Members = () => {
  return (
    <div className="member__box">
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="Member__section-title">
              <h3> OUR TEAM</h3>
            </div>
          </Col>

          {MEMBER__DATA.map((item) => (
            <Col lg="20" md="30" sm="4" xs="6" key={item.id}>
              <div className="single__member-card">
                <div className="member__img">
                  <img src={item.MemberImg} alt="" />

                  <div className="member__content">
                    <h6>{item.MemberName}</h6>
                    <h6>{item.part}</h6>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Members;

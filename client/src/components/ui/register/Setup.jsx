import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "reactstrap";
import "./setup.css";

const Setup = () => {
  return (
    <Fragment>
      <Container className="setup__container">
        <Row>
          <Col lg="12" className="mb-3">
            <div className="free__list__top">
              <h3>User Registeration</h3>
              <h5>Join Us</h5>
            </div>
          </Col>
          <Card
            border="light"
            style={{
              width: "30rem",
              height: "22rem",
              backgroundColor: "black",
              marginBottom: "20px",
            }}
          >
            <Card.Body>
              <Card.Text>It's your CHOICS</Card.Text>
              <Card.Img variant="top" src="" className="select_char" />
            </Card.Body>
          </Card>
          <Col>
            <Card
              border="light"
              style={{
                width: "40rem",
                height: "22rem",
                backgroundColor: "black",
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Card.Body>
                <Card.Text>Welcome !</Card.Text>
                <div className="welcome__form">
                  <label>Create Cool Nickname : </label>
                  <input type="text" />
                  <br />
                  <label>E-mail : </label>
                  <input type="email" />
                </div>
                <br />
                <button className="welcome__btn">Let's Get Started</button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <div className="btn__container">
        <Link to="/join/step3">Back</Link>
      </div>
    </Fragment>
  );
};

export default Setup;

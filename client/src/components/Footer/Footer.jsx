import React from "react";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import "./footer.css";

import { Link } from "react-router-dom";

const MY__ACCOUNT = [
  {
    display: "Author Profile",
    url: "/seller-profile",
  },
  {
    display: "Create Item",
    url: "/create",
  },
  {
    display: "Collection",
    url: "/market",
  },
  {
    display: "Edit Profile",
    url: "/edit-profile",
  },
];

const RESOURCES = [
  {
    display: "Help Center",
    url: "#",
  },
  {
    display: "Create Item",
    url: "#",
  },
  {
    display: "community",
    url: "#",
  },
  {
    display: "Activity",
    url: "#",
  },
];

const COMPANY = [
  {
    display: "About",
    url: "#",
  },
  {
    display: "Careeer",
    url: "#",
  },
  {
    display: "Ranking",
    url: "#",
  },
  {
    display: "Contact Us",
    url: "/contact",
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3" md="6" sm="6">
            <div className="logo">
              <h2 className="d-flex gap-2 align-items-center">
                <span>
                  <i className="ri-bear-smile-line">
                    {/* <img src={logo} alt="loading..." /> */}
                  </i>
                </span>
                NFTs
              </h2>
              <p>
                Players can participate in amazing races on the battlefield to
                earn 프로젝트 작명소 Tokens.
              </p>
            </div>
          </Col>

          <Col lg="2" md="3" sm="6">
            <h5>My Account</h5>
            <ListGroup className="list__group">
              {MY__ACCOUNT.map((item, index) => (
                <ListGroupItem key={index} className="list__item">
                  <Link to={item.url}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="2" md="3" sm="6">
            <h5>Resources</h5>
            <ListGroup className="list__group">
              {RESOURCES.map((item, index) => (
                <ListGroupItem key={index} className="list__item">
                  <Link to={item.url}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="2" md="3" sm="6">
            <h5>Company</h5>
            <ListGroup className="list__group">
              {COMPANY.map((item, index) => (
                <ListGroupItem key={index} className="list__item">
                  <Link to={item.url}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3" md="6" sm="6">
            <h5>Newsletter</h5>
            <input type="text" className="newsletter" placeholder="Email" />
            <div className="social__links d-flex gap-3 align-items-center">
              <span>
                <Link to="#">
                  <i className="ri-github-fill"></i>
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i className="ri-discord-fill"></i>
                </Link>{" "}
              </span>
              <span>
                <Link to="#">
                  <i className="ri-instagram-line"></i>
                </Link>{" "}
              </span>
              <span>
                <Link to="#">
                  <i className="ri-facebook-circle-fill"></i>
                </Link>{" "}
              </span>
              <span>
                <Link to="#">
                  <i className="ri-kakao-talk-fill"></i>
                </Link>
              </span>
            </div>
          </Col>

          <Col lg="12" className="mt-4 text-center">
            <p className="copyright">
              Copyrights 2022, Developed by 프로젝트작명소. @작명소's Tech Diary
              All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

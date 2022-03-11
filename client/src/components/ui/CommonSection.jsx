import React from "react";
import "./common-section.css";

import { Container } from "reactstrap";

const CommonSection = ({ title }) => {
  return (
    <section className="common__section">
      <Container className="common__container">
        <h2>{title}</h2>
      </Container>
    </section>
  );
};

export default CommonSection;

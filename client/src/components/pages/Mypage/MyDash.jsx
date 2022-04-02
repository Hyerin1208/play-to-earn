import React from "react";
import SideBar from "../../ui/dashboard/SideBar";
import MainContent from "../../ui/dashboard/MainContent";
import { Container } from "reactstrap";

const MyDash = () => {
  return (
    <Container
      style={{
        display: "flex",
        height: " 87vh",
        background: "linear-gradient(to bottom right, white 0%, # e6e4ff 70%)",
        borderRadius: "2rem",
        marginBottom: "100px",
      }}
    >
      <SideBar />
      <MainContent />
    </Container>
  );
};

export default MyDash;

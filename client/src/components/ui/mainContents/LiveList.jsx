import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./live-list.css";

import NftCard from "../templete/NftCard";
import { useSelector } from "react-redux";
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";

const LiveList = () => {
  const Selllists = useSelector((state) => state.AppState.Selllists);
  const [Loading, setLoading] = useState(true);
  const [nftArray, setnftArray] = useState([]);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #5900ff;
    width: 100%;
    height: 100%;
    background: #34343465;
  `;

  useEffect(() => {
    try {
      if (Selllists !== null) {
        setnftArray([...Selllists].reverse());
        setLoading(null);
      }
    } catch (error) {
      console.log(error);
      window.location.href = "/error";
    }
  }, [Selllists]);

  return (
    <div className="live__box">
      {Loading ? (
        <div
          className={Loading ? "parentDisable" : ""}
          width="100%"
          height="100%"
        >
          <div className="overlay-box">
            <FadeLoader
              size={150}
              color={"#ffffff"}
              css={override}
              loading={Loading}
              z-index={"1"}
              text="Loading your content..."
            />
          </div>
        </div>
      ) : (
        false
      )}
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="live__list__top">
              <h3>Top collections over last 7 days</h3>
              <span>
                <Link to="/market">Explore more</Link>
              </span>
            </div>
          </Col>
          {nftArray.slice(0, 4).map((items, index) => (
            <Col lg="3" md="4" sm="6" key={index} className="mb-4">
              <NftCard item={items} default={false}></NftCard>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default LiveList;

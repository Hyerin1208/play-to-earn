import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "reactstrap";
import { Link } from "react-router-dom";
import "./live-list.css";

import NftCard from "./NftCard";
import { useSelector, useDispatch } from "react-redux";

const LiveList = () => {
  const OwnerSelllists = useSelector((state) => state.AppState.OwnerSelllists);
  const [loadcheck, setLoadcheck] = useState("로딩중");
  const [nftArray, setnftArray] = useState([]);
  useEffect(() => {
    if (OwnerSelllists !== null) {
      console.log("실행");
      setnftArray([...OwnerSelllists].reverse());
      setLoadcheck(null);
    }
  }, [OwnerSelllists]);

  return (
    <div className="live__box">
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="live__list__top">
              <h3>Top collections over last 7 days</h3>
              <span>
                <Link to="/market">Explor more</Link>
              </span>
            </div>
          </Col>
          {loadcheck}
          {nftArray.slice(0, 4).map((items, index) => (
            <Col lg="3" md="4" sm="6" key={index} className="mb-4">
              <NftCard item={items}></NftCard>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default LiveList;

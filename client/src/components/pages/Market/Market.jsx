import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ReactLoaing from "react-loading";

import CommonSection from "../../ui/templete/CommonSection";
import NftCard from "../../ui/templete/NftCard";

import { Container, Row, Col } from "reactstrap";
import { NFT__DATA } from "../../../assets/data/data";

import "./market.css";
import { useSelector } from "react-redux";

import axios from "axios";

const Market = () => {
  const Selllists = useSelector((state) => state.AppState.Selllists);
  const [Loading, setLoading] = useState(true);
  const [nftArray, setnftArray] = useState([]);
  useEffect(() => {
    if (Selllists !== null) {
      console.log("실행");
      setnftArray([...Selllists].reverse());
      setLoading(null);
    }
  }, [Selllists]);

  // ============ 데이터 정렬 (High,MID,LOW Late) ==================
  // const handleSort = (e) => {
  //   const filterValue = e.target.value;

  //   if (filterValue === "high") {
  //     const filterData = NFT__DATA.filter((item) => item.currentBid >= 6);

  //     setData(filterData);
  //   }

  //   if (filterValue === "mid") {
  //     const filterData = NFT__DATA.filter(
  //       (item) => item.currentBid >= 5.5 && item.currentBid < 6
  //     );

  //     setData(filterData);
  //   }

  //   if (filterValue === "low") {
  //     const filterData = NFT__DATA.filter(
  //       (item) => item.currentBid >= 4.89 && item.currentBid < 5.5
  //     );

  //     setData(filterData);
  //   }
  // };

  // const navigate = useNavigate();
  if (Loading) {
    return (
      <div>
        잠시만 기다려 주세요
        <ReactLoaing type={"bars"} color={"purple"} height={375} width={375} />
      </div>
    );
  } else {
    return (
      <>
        <CommonSection title={"Market Place"} />

        <div className="market__box">
          <Container>
            <Row>
              <Col lg="12" className="mb-5">
                {/* <div className="market__product__filter">
                <div className="filter__left">
                  <div className="all__category__filter">
                    <select onChange={handleCategory}>
                      <option>All Categories</option>
                      <option value="Art">Art</option>
                      <option value="badge">Badge</option>
                      <option value="Item">Item</option>
                      <option value="domain-name">Domain Name</option>
                      <option value="Trading Card">Trading Card</option>
                    </select>
                  </div>
                  <div className="all__items__filter">
                    <select onChange={handleItems}>
                      <option value="">All Items</option>
                      <option value="single-item">Single Item</option>
                      <option value="bundle">Bundle</option>
                    </select>
                  </div>
                </div>

                <div className="filter__right">
                  <select onChange={handleSort}>
                    <option>Sort By</option>
                    <option value="high">High Rate</option>
                    <option value="mid">Mid Rate</option>
                    <option value="low">Low Rate</option>
                  </select>
                </div>
              </div>*/}
              </Col>
              {/* <button
              onClick={() => {
                ownerselllists();
                console.log(nftListBox);
              }}
            >
              show
            </button> */}

              {nftArray.map((items, index) => (
                <Col lg="3" md="4" sm="6" key={index} className="mb-4">
                  <NftCard item={items}></NftCard>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </>
    );
  }
};

export default Market;

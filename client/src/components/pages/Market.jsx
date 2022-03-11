import React, { useState } from "react";

import CommonSection from "../ui/CommonSection";
import NftCard from "../ui/NftCard";

import { NFT__DATA } from "../../assets/data/data";

import { Container, Row, Col } from "reactstrap";

import "./market.css";

const Market = () => {
  const [data, setData] = useState(NFT__DATA);
  const handleCategory = () => {};

  const handleItems = () => {};

  // ============ 데이터 정렬 (High,MID,LOW Late) ==================
  const handleSort = (e) => {
    const filterValue = e.target.value;

    if (filterValue === "high") {
      const filterData = NFT__DATA.filter((item) => item.currentBid >= 6);

      setData(filterData);
    }

    if (filterValue === "mid") {
      const filterData = NFT__DATA.filter(
        (item) => item.currentBid >= 5.5 && item.currentBid < 6
      );

      setData(filterData);
    }

    if (filterValue === "low") {
      const filterData = NFT__DATA.filter(
        (item) => item.currentBid >= 4.89 && item.currentBid < 5.5
      );

      setData(filterData);
    }
  };

  return (
    <>
      <CommonSection title={"Market Place"} />

      <div className="market__box">
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="market__product__filter">
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
              </div>
            </Col>

            {data?.map((item) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={item.id}>
                <NftCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Market;

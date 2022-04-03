import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ReactLoaing from "react-loading";
import _ from "lodash";

import CommonSection from "../../ui/templete/CommonSection";
import NftCard from "../../ui/templete/NftCard";

import { Container, Row, Col } from "reactstrap";
import { NFT__DATA } from "../../../assets/data/data";

import "./market.css";
import { useSelector } from "react-redux";

import axios from "axios";

const pageSize = 10;

const Market = () => {
  const Selllists = useSelector((state) => state.AppState.Selllists);
  const [Loading, setLoading] = useState(true);
  const [nftArray, setnftArray] = useState([]);

  const [data, setData] = useState("");

  const quantityPageRef = useRef(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [endPosition, setEndPosition] = useState(4);

  useEffect(() => {
    if (Selllists !== null) {
      console.log("실행");
      setnftArray([...Selllists].reverse());
      setLoading(null);
      // setPaginatedPosts(
      //   _(...Selllists)
      //     .slice(0)
      //     .take(pageSize)
      //     .value()
      // );
    }
  }, [Selllists]);

  const handlePagination = (index) => {
    setEndPosition((index + 1) * quantityPageRef.current);
    setCurrentIndex(
      (index + 1) * quantityPageRef.current - quantityPageRef.current
    );
  };

  const handlePrev = () => {
    if (currentIndex) {
      setCurrentIndex(currentIndex - quantityPageRef.current);
      setEndPosition(endPosition - quantityPageRef.current);
    }
  };

  const handleNext = () => {
    if (endPosition < data.length) {
      setCurrentIndex(currentIndex + quantityPageRef.current);
      setEndPosition(endPosition + quantityPageRef.current);
    }
  };

  // const pageCount = nftArray ? Math.ceil(nftArray.length / pageSize) : 0;
  // if (pageCount === 1) return null;
  // const pages = _.range(1, pageCount + 1);

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
                <div className="market__product__filter">
                  <div className="filter__left">
                    <div className="all__category__filter">
                      <select>
                        <option>All Categories</option>
                        <option value="Art">Art</option>
                        <option value="badge">Badge</option>
                        <option value="Item">Item</option>
                        <option value="domain-name">Domain Name</option>
                        <option value="Trading Card">Trading Card</option>
                      </select>
                    </div>
                    <div className="all__items__filter">
                      <select>
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

              {nftArray.slice(currentIndex, endPosition).map((items, index) => (
                <Col lg="3" md="4" sm="6" key={index} className="mb-4">
                  <NftCard item={items}></NftCard>
                </Col>
              ))}
            </Row>
            <button className="btn__Paginate" onClick={handlePrev}>
              Previous
            </button>
            {Array(Math.ceil(nftArray.length / quantityPageRef.current))
              .fill(null)
              .map((_, index) => (
                <button
                  className={`btn__Paginate ${
                    currentIndex === 0 && index === currentIndex
                      ? "active__btn"
                      : index === currentIndex / quantityPageRef.current &&
                        "active__btn"
                  }`}
                  onClick={() => handlePagination(index)}
                >
                  {index + 1}
                </button>
              ))}
            <button className="btn__Paginate" onClick={handleNext}>
              Next
            </button>
          </Container>
        </div>
      </>
    );
  }
};

export default Market;

import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import { motion } from "framer-motion";
import ReactLoaing from "react-loading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./myslick.css";

import axios from "axios";
import { useSelector } from "react-redux";
import MySellCard from "./MySellCard";
import { utils } from "ethers";

const MySlick = (props) => {
  const [nftArray, setnftArray] = useState([]);
  // const Selllists = useSelector((state) => state.AppState.Selllists);
  const [Loading, setLoading] = useState(true);
  const [fileUrl, setFileUrl] = useState("");
  const [test, setTest] = useState(false);

  const Account = useSelector((state) => state.AppState.account);
  const MyNFTlists = useSelector((state) => state.AppState.MyNFTlists);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  useEffect(() => {
    console.log(props.lists);
    setnftArray(props.lists);
    setLoading(false);
  }, [props, MyNFTlists]);

  const settings = {
    draggable: true,
    accessibility: true,
    centerMode: false,
    variableWidth: true,
    slidesToShow: 1,
    arrows: true,
    dots: true,
    swipeToSlide: true,
    infinite: false,
  };

  if (Loading) {
    return (
      <div>
        잠시만 기다려 주세요
        <ReactLoaing type={"bars"} color={"purple"} height={375} width={375} />
      </div>
    );
  } else {
    return (
      <div>
        <div className="slick-arrow">
          <Slider {...settings} style={{ width: 900 }}>
            {nftArray.map((items, index) => {
              return (
                <Fragment key={index}>
                  <Col key={index} className="my-items">
                    <MySellCard item={items} setnftArray={setnftArray} />
                  </Col>
                </Fragment>
              );
            })}
          </Slider>
        </div>
      </div>
    );
  }
};

export default MySlick;

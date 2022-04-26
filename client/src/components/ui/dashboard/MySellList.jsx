import React, { useEffect, useState } from "react";
import { Col } from "reactstrap";

import ReactLoaing from "react-loading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axios from "axios";
import { useSelector } from "react-redux";

import "./my-sellList.css";
import NftSellCard from "./MySellCard";

const MySellList = () => {
  const [nftArray, setnftArray] = useState([]);

  const [Loading, setLoading] = useState(true);
  const [fileUrl, setFileUrl] = useState("");

  const Account = useSelector((state) => state.AppState.account);
  const MyNFTlists = useSelector((state) => state.AppState.MyNFTlists);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  useEffect(() => {
    if (MyNFTlists.length !== 0) {
      console.log("실행");
      setnftArray(MyNFTlists.filter((lists) => lists.formInput.sell === true));
      setLoading(null);
    }
  }, [MyNFTlists]);

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
      <div className="myselllist__box">
        {/* <button onClick={() => mynftlists()}>마이리스트</button> */}
        <div className="slick-arrow">
          <Slider {...settings} style={{ width: 900 }}>
            {nftArray[0] !== undefined ? (
              nftArray.map((items, index) => {
                return (
                  // <motion.div key={index} className="my-items">
                  // <Col key={index} className="my-items">
                  <NftSellCard key={index} item={items}></NftSellCard>
                  // </Col>
                );
              })
            ) : (
              <div>항목없음</div>
            )}
          </Slider>
        </div>
      </div>
    );
  }
};

export default MySellList;

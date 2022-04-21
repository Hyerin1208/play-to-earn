import React, { useEffect, useState } from "react";
import ReactLoaing from "react-loading";
import { Card, Col, Row } from "reactstrap";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MySellCard from "../../ui/dashboard/MySellCard";

import "./owner-sellList.css";

import axios from "axios";

import { useSelector } from "react-redux";
import { FaMeteor } from "react-icons/fa";

const OwnerSellList = () => {
  const [nftArray, setnftArray] = useState([]);
  const [Loading, setLoading] = useState(true);

  const Account = useSelector((state) => state.AppState.account);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  useEffect(() => {
    ownerselllists([...nftArray].reverse());
    setLoading(null);
  }, [CreateNFTContract]);

  //오너 nft 판매 리스트
  async function ownerselllists() {
    if (CreateNFTContract !== null) {
      const lists = await CreateNFTContract.methods
        .OwnerSelllists()
        .call({ from: Account }, (error) => {
          if (!error) {
            console.log("send ok");
          } else {
            console.log(error);
          }
        });
      const result = await Promise.all(
        lists.map(async (i) => {
          const tokenURI = await CreateNFTContract.methods
            .tokenURI(i.tokenId)
            .call({ from: Account });
          const meta = await axios.get(tokenURI).then((res) => res.data);
          let item = {
            fileUrl: await meta.image,
            formInput: {
              tokenid: i.tokenId,
              price: i.price,
              rare: i.rare,
              star: i.star,
              name: await meta.name,
              description: await meta.description,
            },
          };
          return item;
        })
      );
      console.log(result);
      setnftArray(result);
    }
  }

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
        <ReactLoaing type={"bars"} color={"purple"} height={600} width={375} />
      </div>
    );
  } else {
    return (
      <div>
        {/* <button onClick={() => mynftlists()}>마이리스트</button> */}
        <div className="slick-arrow">
          <Slider {...settings} style={{ width: 1200 }}>
            {nftArray.map((items, index) => {
              return (
                // <motion.div key={index} className="my-items">
                <Col key={index} className="my-items">
                  <MySellCard item={items}></MySellCard>
                </Col>
              );
            })}
          </Slider>
        </div>
      </div>
    );
  }
};

export default OwnerSellList;

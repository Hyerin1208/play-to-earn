import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import { motion } from "framer-motion";
import ReactLoaing from "react-loading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import NftCard from "../templete/NftCard";

import axios from "axios";
import { useSelector } from "react-redux";

const MySlick = () => {
  const [nftArray, setnftArray] = useState([]);
  // const Selllists = useSelector((state) => state.AppState.Selllists);
  const [Loading, setLoading] = useState(true);
  const [fileUrl, setFileUrl] = useState("");
  const [test, setTest] = useState(false);
  // const [NFTimage, setNFTimage] = useState("");
  // const [NFTname, setNFTname] = useState("");
  // const [NFTdesc, setNFTdesc] = useState("");

  // const [form, setForm] = useState({
  //   fileUrl: fileUrl,
  //   formInput: {
  //     id: "",
  //     price: "",
  //     name: "",
  //     description: "",
  //   },
  // });

  // console.log(nftArray);

  const Account = useSelector((state) => state.AppState.account);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  useEffect(() => {
    mynftlists();
    setLoading(null);
  }, [CreateNFTContract]);

  //내 nft 리스트
  async function mynftlists() {
    if ((await CreateNFTContract) === null) {
      setLoading(true);
    } else {
      const lists = await CreateNFTContract.methods
        .MyNFTlists()
        .call({ from: Account }, (error) => {
          if (!error) {
            console.log("send ok");
          } else {
            console.log(error);
          }
        });
      console.log(await lists);

      const result = await Promise.all(
        lists.map(async (i) => {
          const tokenURI = await CreateNFTContract.methods
            .tokenURI(i.tokenId)
            .call({ from: Account });
          const meta = await axios.get(tokenURI).then((res) => res.data);
          let item = {
            fileUrl: await meta.image,
            formInput: {
              price: await meta.price,
              name: await meta.name,
              tokenId: i.tokenId,
              description: await meta.description,
            },
          };
          return item;
        })
      );

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
        <ReactLoaing type={"bars"} color={"purple"} height={375} width={375} />
      </div>
    );
  } else {
    return (
      <div>
        {/* <button onClick={() => mynftlists()}>마이리스트</button> */}
        <div className="slick-arrow">
          <Slider {...settings} style={{ width: 900 }}>
            {nftArray.map((items, index) => {
              console.log(items);
              return (
                <Fragment>
                  <input
                    type="checkbox"
                    hidden={test}
                    className={"myslic__kCheck"}
                  />
                  {/* // <motion.div key={index} className="my-items"> */}
                  <Col key={index} className="my-items">
                    <NftCard item={items}></NftCard>
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

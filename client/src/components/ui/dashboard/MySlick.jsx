import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import NftCard from "../NftCard";

import axios from "axios";
import { useSelector } from "react-redux";

const MySlick = () => {
  const [nftArray, setnftArray] = useState([]);
  const Selllists = useSelector((state) => state.AppState.Selllists);

  const [fileUrl, setFileUrl] = useState("");
  const [NFTimage, setNFTimage] = useState("");
  const [NFTname, setNFTname] = useState("");
  const [NFTdesc, setNFTdesc] = useState("");

  const [form, setForm] = useState({
    fileUrl: fileUrl,
    formInput: {
      id: "",
      price: "",
      name: "",
      description: "",
    },
  });

  const Account = useSelector((state) => state.AppState.account);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  useEffect(() => {
    try {
      if (Selllists !== null) {
        console.log("실행");
        setnftArray([...Selllists].reverse());
      }
    } catch (error) {
      console.log(error);
    }
  }, [Selllists]);

  //내 nft 리스트
  async function mynftlists() {
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
  }

  //URI 확인
  async function gettokenuri(tokenId) {
    const tokenURI = await CreateNFTContract.methods
      .tokenURI(tokenId)
      .call({ from: Account }, (error) => {
        if (!error) {
          console.log("send ok");
        } else {
          console.log(error);
        }
      });
    await axios.get(tokenURI).then(async (data) => {
      setNFTname(data.data.name);
      setNFTdesc(data.data.description);
      setNFTimage(data.data.image);
      setForm({
        fileUrl: data.data.image,
        formInput: {
          price: "",
          name: data.data.name,
          description: data.data.description,
        },
      });
    });
    // const result = await axios.get(tokenURI).then((data) => data.data);
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

  return (
    <div>
      <div className="slick-arrow">
        <Slider {...settings} style={{ width: 900 }}>
          {nftArray.map((items, index) => {
            return (
              // <motion.div key={index} className="my-items">
              <Col key={index} className="my-items">
                <NftCard
                  item={items}
                  id={items.formInput.tokenid}
                  onClick={async (e) => {
                    let tokenid = e.target.getAttribute("id");
                    await CreateNFTContract.methods.tokenURI(tokenid).call({
                      from: Account,
                    });
                  }}
                ></NftCard>
              </Col>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default MySlick;

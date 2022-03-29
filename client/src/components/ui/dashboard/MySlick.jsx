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
    dots: false,
    infinite: true,
    speed: 500,
    cssEase: "linear",
    slidesToShow: 2,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          infinite: true,
          // slidesToShow: 3,
          slidesToScroll: 4,
          initialSlide: 3,
          dots: false,
          draggable: true, //드래그 가능 여부
          responsive: [
            // 반응형 웹 구현 옵션
            {
              breakpoint: 960, //화면 사이즈 960px일 때
              settings: {
                //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
                // slidesToShow: 3,
              },
            },
            {
              breakpoint: 768, //화면 사이즈 768px일 때
              settings: {
                //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
                // slidesToShow: 2,
              },
            },
          ],
        },
      },
    ],
  };
  const style = {
    width: "300px",
  };
  return (
    <div>
      <div className="slick-arrow">
        <Slider {...settings} style={{ width: 500 }}>
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

import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";

import ReactLoaing from "react-loading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import NftCard from "../templete/NftCard";

import axios from "axios";
import { useSelector } from "react-redux";

import "./my-sellList.css";

const MySellList = () => {
  const [nftArray, setnftArray] = useState([]);

  const [Loading, setLoading] = useState(true);
  const [fileUrl, setFileUrl] = useState("");

  const Account = useSelector((state) => state.AppState.account);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  useEffect(() => {
    userselllists();
    setLoading(null);
  }, [CreateNFTContract]);

  //유저(내가) 판매하는 nft 리스트
  async function userselllists() {
    if ((await CreateNFTContract) === null) {
      setLoading(true);
    } else {
      const lists = await CreateNFTContract.methods
        .UserSelllists()
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
      <div className="myselllist__box">
        {/* <button onClick={() => mynftlists()}>마이리스트</button> */}
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
  }
};

export default MySellList;

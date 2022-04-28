import React, { useEffect, useState } from "react";
import { Col } from "reactstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MySellCard from "../../ui/dashboard/MySellCard";
import "./owner-sellList.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { utils } from "ethers";
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";

const OwnerSellList = () => {
  const [nftArray, setnftArray] = useState([]);
  const [Loading, setLoading] = useState(false);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #5900ff;
    width: 100%;
    height: 100%;
    background: #34343465;
  `;

  const Account = useSelector((state) => state.AppState.account);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  useEffect(() => {
    ownerselllists([...nftArray].reverse());
    setLoading(false);
  }, [CreateNFTContract]);
  function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  }
  //오너 nft 판매 리스트
  async function ownerselllists() {
    if (CreateNFTContract !== null) {
      setLoading(true);
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
              price: utils.formatEther(i.price),
              rare: i.rare,
              star: i.star,
              sell: i.sell,
              name: await meta.name,
              description: await meta.description,
            },
          };
          return item;
        })
      );
      setnftArray(result);
    }
    setLoading(false);
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
      {Loading ? (
        <div
          className={Loading ? "parentDisable" : ""}
          width="100%"
          height="100%"
        >
          <div className="overlay-box">
            <FadeLoader
              size={150}
              color={"#ffffff"}
              css={override}
              loading={Loading}
              z-index={"1"}
              text="Loading your content..."
            />
          </div>
        </div>
      ) : (
        false
      )}
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
};

export default OwnerSellList;

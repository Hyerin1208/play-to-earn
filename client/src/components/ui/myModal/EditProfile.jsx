import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import user__bg from "../../../assets/images/user_bg.png";

import NftCard from "../templete/NftCard";
import ReactLoaing from "react-loading";

import "./edit-profile.css";

import { NFT__DATA } from "../../../assets/data/data";

import axios from "axios";
import { useSelector } from "react-redux";

const EditProfile = ({ setShowModal }) => {
  const [seletedImg, setSelectedImg] = useState(NFT__DATA[0]);

  const [nftArray, setnftArray] = useState([]);
  const [Loading, setLoading] = useState(true);

  const [userBackImage, setUserBackImage] = useState(user__bg);

  const Account = useSelector((state) => state.AppState.account);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  useEffect(() => {
    try {
      console.log("실행");
      mynftlists();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
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
        await lists.map(async (i) => {
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
      console.log(result);
      setnftArray(result);
    }
  }

  // console.log(nftArray[0].fileUrl);

  if (Loading) {
    return (
      <div>
        잠시만 기다려 주세요
        <ReactLoaing type={"bars"} color={"purple"} height={375} width={375} />
      </div>
    );
  } else {
    return (
      <div className="nft_wrapper">
        <div className="single_modal">
          <span className="close_modal">
            <i
              className="ri-close-line"
              onClick={() => setShowModal(false)}
            ></i>
          </span>
          <h6 className="text-center text-light">Change your NFT</h6>
          <p className="text-center text-light">Buy. Sell. Collect.</p>

          <div className="box__myNft">
            <div className="mynft__list">
              <Container className="images__box">
                <Row>
                  {/* <Col lg="6" md="4" sm="2"> */}
                  {/* <NftCard item={item} /> */}
                  {/* </Col> */}
                  {/* <img
                    src={nftArray[0].fileUrl}
                    alt="Selected"
                    className="selected"
                  /> */}
                  <div className="img__Container">
                    {/* {nftArray.map((img, index) => (
                      <img
                        key={index}
                        src={img.fileUrl}
                        alt="nfts"
                        onClick={() => setSelectedImg(img)}
                        style={{
                          border: seletedImg === img ? "4px solid purple" : "",
                        }}
                      />
                    ))} */}
                  </div>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default EditProfile;

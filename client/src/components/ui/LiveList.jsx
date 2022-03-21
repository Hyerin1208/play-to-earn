import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "reactstrap";
import { Link } from "react-router-dom";
import "./live-list.css";

import axios from "axios";

import NftCard from "./NftCard";
import { useSelector } from "react-redux";

const LiveList = (props) => {
  const [nftListBox, setnftListBox] = useState([]);
  const nftArray = [...nftListBox].reverse();
  const [loadingState, setLoadingState] = useState("not-loaded");

  const [fileUrl, setFileUrl] = useState("");
  const [NFTimage, setNFTimage] = useState("");
  const [NFTname, setNFTname] = useState("");
  const [NFTdesc, setNFTdesc] = useState("");
  const [NFTprice, setNFTprice] = useState("");
  const [form, setForm] = useState({
    fileUrl: fileUrl,
    formInput: {
      price: "",
      name: "",
      description: "",
    },
  });

  //console.log("+++++++++++");

  useEffect(() => {
    ownerselllists();
  }, []);

  const Account = useSelector((state) => state.AppState.account);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  //오너 nft 판매 리스트
  async function ownerselllists() {
    const lists = await CreateNFTContract.methods
      .OwnerSelllists()
      .call({ from: Account }, (error) => {
        if (!error) {
          console.log("send ok");
        } else {
          console.log(error);
        }
      });

    // const items = await Promise.all(
    //   lists.map(async (i) => {
    //     const tokenURI = await CreateNFTContract.methods.tokenURI(i.tokenId);
    //     const meta = await axios.get(tokenURI);
    //     const price = parseInt(i.price.toString(), "ether");
    //     let item = {
    //       price,
    //       tokenId: i.tokenId.toNumber(),
    //       image: meta.lists.image,
    //       name: meta.lists.name,
    //       description: meta.lists.description,
    //     };
    //     return item;
    //   })
    // );
    console.log(await lists);
    setnftListBox(await lists);
    setLoadingState("loaded");
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
    // console.log(result);
  }

  //유저 nft 판매 리스트
  // async function userselllists() {
  //   const lists = await CreateNFTContract.methods
  //     .UserSelllists()
  //     .call({ from: Account }, (error) => {
  //       if (!error) {
  //         console.log("send ok");
  //       } else {
  //         console.log(error);
  //       }
  //     });
  //   console.log(await lists);
  // }

  if (loadingState === "loaede" && !nftArray.length)
    return <h1 className="px-20 py-10 text-3xl">No items in market place</h1>;
  return (
    <div className="live__box">
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="live__list__top">
              <h3>Top collections over last 7 days</h3>
              <span>
                <Link to="/market">Explor more</Link>
              </span>
            </div>
          </Col>
          <button onClick={() => ownerselllists()}>
            owner sell lists
            {/* <button
            onClick={() => {
              const CardImage = document.querySelector("").value;
              const CardTitle = document.querySelector("").value;
              const CardPrice = document.querySelector("").value;
              const CardDesc = document.querySelector("").value;
            }}
          > */}
            owner sell lists
          </button>
          {nftArray.slice(0, 4).map((item, index) => (
            <Col lg="3" md="4" sm="6" key={index} className="mb-4">
              <NftCard item={form}>
                <Card.Img varient="top" src={item.image} />
              </NftCard>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default LiveList;

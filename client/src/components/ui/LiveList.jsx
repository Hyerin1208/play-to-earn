import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./live-list.css";

import axios from "axios";

import NftCard from "./NftCard";
import { useSelector } from "react-redux";
import { fileURLToPath } from "url";

const LiveList = (props) => {
  const [nftListArr, setnftListArr] = useState({
    price: "",
    name: "",
    description: "",
  });
  const [nftListBox, setnftListBox] = useState([]);
  const nftArray = [...nftListBox].reverse();

  const [NFTimage, setNFTimage] = useState("");
  const [NFTname, setNFTname] = useState("");
  const [NFTdesc, setNFTdesc] = useState("");
  const [NFTprice, setNFTprice] = useState("");
  const [form, setForm] = useState({
    fileUrl: "",
    formInput: {
      price: "",
      name: "",
      description: "",
    },
  });

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
    console.log(await lists);
    setnftListBox(await lists);
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
          <button onClick={() => ownerselllists()}>owner sell lists</button>

          {nftListBox.slice(0, 4).map((item, index) => (
            <Col lg="3" md="4" sm="6" key={index} className="mb-4">
              <NftCard item={form} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default LiveList;

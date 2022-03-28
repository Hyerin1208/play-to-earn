import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Navbar, Row } from "reactstrap";
import Earnings from "./Earnings";
import ReactLoaing from "react-loading";

import axios from "axios";

import "./main-container.css";
import MyLikes from "./MyLikes";
import MyRanking from "./MyRanking";
import NftCard from "../NftCard";

const MainContent = () => {
  const Selllists = useSelector((state) => state.AppState.Selllists);
  const [Loading, setLoading] = useState(true);
  const [nftArray, setnftArray] = useState([]);

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

  useEffect(() => {
    try {
      if (Selllists !== null) {
        console.log("실행");
        setnftArray([...Selllists].reverse());
        setLoading(null);
      }
    } catch (error) {
      console.log(error);
    }
  }, [Selllists]);

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

  if (Loading) {
    return (
      <div>
        잠시만 기다려 주세요
        <ReactLoaing type={"bars"} color={"purple"} height={375} width={375} />
      </div>
    );
  } else {
    return (
      <Fragment>
        <div className="main__dash">
          <Navbar />
          <div className="sub__container">
            <div className="section__one">
              <Col className="col__one1">
                <Earnings />
              </Col>
              <Col className="col__one2">
                <MyRanking />
              </Col>
              <Col className="col__one3">
                <MyLikes />
              </Col>
            </div>

            <div className="section__two">
              <Container>
                <Row>
                  {nftArray.map((items, index) => (
                    <Col lg="4" md="4" sm="6" key={index} className="mb-4">
                      {/* <NftCard item={items}></NftCard> */}
                      <NftCard
                        item={items}
                        id={items.formInput.tokenid}
                        onClick={async (e) => {
                          let tokenid = e.target.getAttribute("id");
                          await CreateNFTContract.methods
                            .tokenURI(tokenid)
                            .call({
                              from: Account,
                            });
                        }}
                        // onClick={() => navigate(`${items.formInput.tokenid}`)}
                        // onPress={() =>
                        //   navigation.navigate("Details", {
                        //     tokenid: items.formInput.tokenid,
                        //   })
                        // }
                      ></NftCard>
                    </Col>
                  ))}
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
};

export default MainContent;

import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "reactstrap";
import { create as ipfsHttpClient } from "ipfs-http-client";
import "./setup.css";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import SelectCard from "./SelectCard";
import { utils } from "ethers";
import { updateMyLists } from "../../../redux/actions";
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const Setup = () => {
  const dispatch = useDispatch();
  const SelectNFT = useSelector((state) => state.NftsReducer);

  const account = useSelector((state) => state.AppState.account);
  const MyNFTlists = useSelector((state) => state.AppState.MyNFTlists);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );
  const networkid = useSelector((state) => state.AppState.networkid);
  const chainid = useSelector((state) => state.AppState.chainid);

  const [form, setForm] = useState({
    name: SelectNFT.name,
    description: SelectNFT.description,
    image: SelectNFT.image,
    nick: "Please enter your name using only letters.",
    email: "Enter your E-mail address",
  });

  const [checkItem, setCheckItem] = useState(null);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #5900ff;
  `;
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 5000);
  // }, []);

  async function addSignUp() {
    if (chainid === 1337 ? false : networkid === chainid ? false : true)
      return alert("네트워크 아이디를 확인하세요");

    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(form.email))
      return alert("이메일 형식이 틀렸어요. 다시 확인해주세요.");

    setLoading(true);
    const checkuser = await axios
      .post("http://localhost:5000/user/checkuser", {
        address: account,
        nick: form.nick,
        email: form.email,
      })
      .then((res) => res.data.result);
    console.log(checkuser);
    if (checkuser) {
      let data = JSON.stringify({
        name: SelectNFT.name,
        description: SelectNFT.description,
        image: SelectNFT.image,
      });
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      function sleep(ms) {
        const wakeUpTime = Date.now() + ms;
        while (Date.now() < wakeUpTime) {}
      }
      let price = 1000;
      await CreateNFTContract.methods
        .CreateNFTinContract(url, utils.parseEther(price.toString()))
        .send({ from: account, gas: 3000000 }, (error) => {
          if (!error) {
            console.log("send ok");
            setLoading(true);
          } else {
            console.log(error);
          }
        })
        .then(async (res) => {
          const tokenId = res.events.NFTItemCreated.returnValues.tokenId;
          const star = res.events.NFTItemCreated.returnValues.star;
          const rare = res.events.NFTItemCreated.returnValues.rare;
          const sell = res.events.NFTItemCreated.returnValues.sell;
          const price = res.events.NFTItemCreated.returnValues.price;
          let NFTInfo = {
            fileUrl: SelectNFT.image,
            formInput: {
              tokenid: tokenId,
              price: utils.formatEther(price),
              star: star,
              rare: rare,
              sell: sell,
              name: SelectNFT.name,
              description: SelectNFT.description,
            },
          };
          await axios
            .post(`http://localhost:5000/user/register`, {
              tokenId: tokenId,
              address: account,
              name: SelectNFT.name,
              description: SelectNFT.description,
              price: utils.formatEther(price),
              nick: form.nick,
              email: form.email,
              image: SelectNFT.image,
              contractAddress: CreateNFTContract.options.address,
            })
            .then(async (res) => {
              if (res.data.message === "ok") {
                setLoading(false);
                alert(`NFT발급 성공\n반갑습니다. ${form.nick}님`);
                console.log(NFTInfo);
                dispatch(updateMyLists({ MyNFTlists: [NFTInfo] }));
                window.location.href = "/";
              } else {
                setLoading(false);
                alert("이미 발급된 번호입니다.");
              }
            });
        });
    } else {
      setLoading(false);
      alert("이미 가입되어있는 이메일 또는 닉네임 입니다.");
    }
  }
  return (
    <Fragment>
      {loading ? (
        <FadeLoader
          size={150}
          color={"#4512bc"}
          css={override}
          loading={loading}
        />
      ) : (
        <Container className="setup__container">
          <Row>
            <Col lg="8" className="mb-3">
              <div className="free__list__top">
                <h3>User Registeration</h3>
              </div>
            </Col>
            <div
              border="light"
              style={{
                width: "30rem",
                height: "27rem",
              }}
            >
              <Card.Body>
                <Card.Text>It's your CHOICS</Card.Text>
                <Card.Img variant="top" src="" className="select_char" />
                <div className="show__box">
                  <SelectCard
                    check={{ checkItem: checkItem, setCheckItem: setCheckItem }}
                    item={{ form }}
                  />
                </div>
              </Card.Body>
            </div>
            <Col>
              <div
                border="light"
                style={{
                  maxwidth: "40rem",
                  height: "22rem",
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Card.Body>
                  <Card.Text>Welcome !</Card.Text>
                  <div className="welcome__form">
                    <label>Create Cool Nickname : </label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setForm({ ...form, nick: e.target.value })
                      }
                      placeholder="Please enter your name using only letters."
                    />
                    <br />
                    <label>E-mail : </label>
                    <input
                      type="email"
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="Enter your E-mail address"
                    />
                  </div>
                  <br />
                  <button
                    onClick={async () => {
                      await addSignUp();
                    }}
                    className="welcome__btn"
                  >
                    Let's Get Started
                  </button>
                </Card.Body>
              </div>
            </Col>
          </Row>
        </Container>
      )}
      <div className="btn__container">
        <Link to="/join/step3">Back</Link>
      </div>
    </Fragment>
  );
};

export default Setup;

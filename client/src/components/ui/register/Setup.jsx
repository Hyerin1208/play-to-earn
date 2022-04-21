import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "reactstrap";
import { create as ipfsHttpClient } from "ipfs-http-client";
import "./setup.css";

import axios from "axios";
import { useSelector } from "react-redux";
import SelectCard from "./SelectCard";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const Setup = () => {
  const SelectNFT = useSelector((state) => state.NftsReducer);

  const account = useSelector((state) => state.AppState.account);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  const [form, setForm] = useState({
    name: SelectNFT.name,
    description: SelectNFT.description,
    image: SelectNFT.image,
    nick: "Please enter your name using only letters.",
    email: "Enter your E-mail address",
  });

  const addSignUp = async () => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(form.email)) {
      alert("이메일 형식이 틀렸어요. 다시 확인해주세요.");
    } else {
      await axios
        .post("http://localhost:5000/user/register", {
          address: account,
          nick: form.nick,
          email: form.email,
          image: SelectNFT.image,
        })
        .then(() => {
          console.log("success");
        });
      await lastBtn();
      window.location.href = "http://localhost:3000/";
    }
  };

  const [checkItem, setCheckItem] = useState(null);

  async function lastBtn() {
    let data = JSON.stringify({
      name: SelectNFT.name,
      description: SelectNFT.description,
      image: SelectNFT.image,
    });
    const added = await client.add(data);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;

    let price = 1000;
    await CreateNFTContract.methods
      .CreateNFTinContract(url, price)
      .send({ from: account, gas: 3000000 }, (error) => {
        if (!error) {
          console.log("send ok");
        } else {
          console.log(error);
        }
      })
      .then(async (res) => {
        await axios
          .post(`http://localhost:5000/nfts`, {
            tokenId: res.events.NFTItemCreated.returnValues.tokenId,
            address: account,
            img: SelectNFT.image,
            name: SelectNFT.name,
            description: SelectNFT.description,
            price: price,
          })
          .then((res) => {
            if (res.data.message === "ok") {
              alert("NFT발급 성공");
            } else {
              alert("이미 발급된 번호입니다.");
            }
          });
      });
  }

  return (
    <Fragment>
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
                    onChange={(e) => setForm({ ...form, nick: e.target.value })}
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
                    // await lastBtn();
                    // alert("해당 NFT가 발급 되었습니다");
                    // window.location.href = "http://localhost:3000/";
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
      <div className="btn__container">
        <Link to="/join/step3">Back</Link>
      </div>
    </Fragment>
  );
};

export default Setup;

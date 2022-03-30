import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "reactstrap";
import { updateLists, setNfts } from "../../../redux/actions/index";
import { create as ipfsHttpClient } from "ipfs-http-client";
import "./setup.css";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import FreeCard from "./FreeCard";
import SelectCard from "./SelectCard";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const Setup = () => {
  const SelectNFT = useSelector((state) => state.NftsReducer);

  const Account = useSelector((state) => state.AppState.account);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: SelectNFT.name,
    description: SelectNFT.description,
    image: SelectNFT.image,
    nick: "Please enter your name using only letters.",
    email: "Enter your E-mail address",
  });
  console.log(form);

  // async function selectedNft() {
  //   await SelectNFT.send({ from: Account, gas: 3000000 }, (error) => {
  //     if (!error) {
  //       console.log("send ok");
  //     } else {
  //       console.log(error);
  //     }
  //   }).then((res) => {
  //     let item = {
  //       name: SelectNFT.name,
  //       description: SelectNFT.description,
  //       image: SelectNFT.image,
  //       nick: "",
  //       email: "",
  //     };
  //     console.log(item);
  //   });
  // }

  useEffect(() => {
    try {
    } catch (error) {
      console.log(error);
    }
  }, []);

  // const displayInfo = () => {
  //   console.log(nick + email);
  // };
  const addSignUp = async () => {
    await axios
      .post("http://localhost:5000/user/register", {
        nick: form.nick,
        email: form.email,
      })
      .then(() => {
        console.log("success");
      });
  };

  const getJoinus = async () => {
    await axios.get("http://localhost:5000/user/login").then((response) => {
      console.log(response);
    });
  };

  const [checkItem, setCheckItem] = useState(null);
  console.log(checkItem);

  async function lastBtn() {
    let data = JSON.stringify({
      name: SelectNFT.name,
      description: SelectNFT.description,
      image: SelectNFT.image,
      nick: form.nick,
      email: form.email,
    });

    console.log(form.email);
    const added = await client.add(data);
    console.log(added);
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    console.log(url);

    // setForm(SelectNFT.id);

    // console.log(SelectNFT.id);

    let price = 1000;
    await CreateNFTContract.methods
      .CreateNFTinContract(url, price)
      .send({ from: Account, gas: 3000000 }, (error) => {
        if (!error) {
          console.log("send ok");
        } else {
          console.log(error);
        }
      })
      .then((res) => {
        let item = {
          name: SelectNFT.name,
          description: SelectNFT.description,
          image: SelectNFT.image,
          nick: form.nick,
          email: form.email,
        };
        console.log(item);

        dispatch(updateLists({ Selllists: item }));
      });
  }

  return (
    <Fragment>
      <Container className="setup__container">
        <Row>
          <Col lg="12" className="mb-3">
            <div className="free__list__top">
              <h3>User Registeration</h3>
              {/* <h5>Join Us</h5> */}
            </div>
          </Col>
          <Card
            border="light"
            style={{
              width: "30rem",
              height: "32rem",
              backgroundColor: "black",
              marginBottom: "20px",
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
          </Card>
          <Col>
            <Card
              border="light"
              style={{
                width: "40rem",
                height: "22rem",
                backgroundColor: "black",
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
                  className="show__btn"
                  onClick={() => getJoinus()}
                  style={{ width: "120px" }}
                >
                  Show
                </button>
                <button
                  className="show__btn"
                  onClick={() => addSignUp()}
                  style={{ width: "120px" }}
                >
                  signup
                </button>
              </Card.Body>
            </Card>
            {/*  window.location.href 새로고침을 하지 않으면 에러가 발생 */}
            <button
              onClick={() => {
                lastBtn();
                addSignUp();
                alert("해당 NFT가 발급 되었습니다");
                window.location.href = "http://localhost:3000/";
              }}
              className="welcome__btn"
            >
              Let's Get Started
            </button>
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

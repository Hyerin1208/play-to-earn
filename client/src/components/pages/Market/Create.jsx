import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import "./create.css";

////////////////////////////////////////////////////////////////////
/* 아래는 임시데이터와 img + 카드구조 & css */
import CommonSection from "../../ui/templete/CommonSection";
import NftCard from "../../ui/templete/NftCard";
import { updateSellLists } from "../../../redux/actions/index";

import defaultImg from "../../../assets/images/defaultImg.gif";
import { useNavigate } from "react-router-dom";
import { utils } from "ethers";

/////////////////////////////////////////////////////////////////////

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const Create = (props) => {
  const AAT = useSelector(
    (state) => state.AppState.AmusementArcadeTokenContract
  );
  const networkid = useSelector((state) => state.AppState.networkid);
  const chainid = useSelector((state) => state.AppState.chainid);
  let Navi = useNavigate();

  const [NFTform, setNFTform] = useState({
    fileUrl: defaultImg,
    formInput: {
      tokenid: 0,
      price: 0,
      star: 1,
      rare: 1,
      sell: false,
      name: "noname",
      description: "desc",
    },
  });
  // const [fileUrl, setFileUrl] = useState(defaultImg);
  // const [formInput, updateFormInput] = useState({
  //   price: 0,
  //   name: "noname",
  //   description: "desc",
  //   rare: "1",
  //   star: "1",
  // });
  const Account = useSelector((state) => state.AppState.account);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );
  const dispatch = useDispatch();

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      NFTform.fileUrl = url;
      setNFTform({ ...NFTform });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function uploadToIPFS() {
    const fileUrl = NFTform.fileUrl;
    const { name, description, price } = NFTform.formInput;
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      return url;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  //nft작성
  async function CreateNFT() {
    console.log(networkid);
    console.log(chainid);
    if (chainid === 1337 ? false : networkid === chainid ? false : true)
      return alert("네트워크 아이디를 확인하세요");
    const url = await uploadToIPFS();
    /* next, create the item */
    const price = NFTform.formInput.price;
    console.log(price);

    await CreateNFTContract.methods
      .CreateNFTinContract(url, utils.parseEther(price.toString()))
      .send({ from: Account, gas: 3000000 }, (error, data) => {
        if (!error) {
          console.log("send ok");
        } else {
          console.log(error);
        }
      })
      .then(async (res) => {
        const lists = await CreateNFTContract.methods.Selllists().call();

        const listsForm = await Promise.all(
          lists.map(async (i) => {
            const tokenURI = await CreateNFTContract.methods
              .tokenURI(i.tokenId)
              .call();
            const meta = await axios.get(tokenURI).then((res) => res.data);
            let item = {
              fileUrl: await meta.image,
              formInput: {
                tokenid: i.tokenId,
                price: utils.formatEther(i.price),
                star: i.star,
                rare: i.rare,
                sell: i.sell,
                name: await meta.name,
                description: await meta.description,
              },
            };
            return item;
          })
        );
        dispatch(
          updateSellLists({
            Selllists: listsForm,
          })
        );

        await axios
          .post(`http://localhost:5000/nfts`, {
            tokenId: res.events.NFTItemCreated.returnValues.tokenId,
            address: Account,
            img: NFTform.fileUrl,
            name: NFTform.formInput.name,
            description: NFTform.formInput.description,
            price: NFTform.formInput.price,
            contractAddress: CreateNFTContract.options.address,
          })
          .then((res) => {
            if (res.data.message === "ok") {
              alert("NFT발급 성공");
              Navi("/market");
            } else {
              alert("이미 발급된 번호입니다.");
            }
          });
      });
  }

  return (
    <>
      <CommonSection title="Create Item" />

      <div className="create__box">
        <Container>
          <Row>
            <Col lg="3" md="4" sm="6">
              <h5 className="preview__item">Preview Item</h5>
              {/* 아래 이미지 preview 변경이 아직 안됨 */}
              <NftCard item={NFTform} default={true} />
              {/* {fileUrl && <NftCard item={item} src={fileUrl} />} */}
            </Col>

            <Col lg="9" md="8" sm="6">
              <div className="create__input">
                <form>
                  <div className="form__input">
                    <label htmlFor="">Upload File</label>
                    <input
                      type="file"
                      name="Asset"
                      className="upload__input"
                      width="350"
                      src={NFTform.fileUrl}
                      onChange={onChange}
                    />
                    {/* {fileUrl && (
                      <img className="rounded mt-4" width="350" src={fileUrl} />
                    )} */}
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Title</label>
                    <input
                      type="text"
                      placeholder="Enter title"
                      onChange={(e) => {
                        NFTform.formInput.name = e.target.value;
                        setNFTform({ ...NFTform });
                      }}
                    />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Price</label>
                    <input
                      type="number"
                      placeholder="Enter price for one item (AAT)"
                      onChange={(e) => {
                        NFTform.formInput.price = e.target.value;
                        setNFTform({ ...NFTform });
                      }}
                    />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Description</label>
                    <textarea
                      name=""
                      id=""
                      rows="8"
                      placeholder="Enter Description"
                      className="w-100"
                      onChange={(e) => {
                        NFTform.formInput.description = e.target.value;
                        setNFTform({ ...NFTform });
                      }}
                    ></textarea>
                  </div>
                </form>
              </div>
            </Col>

            <button
              className="create__btn"
              onClick={async () => {
                await CreateNFT();
              }}
              style={{ marginTop: "20px" }}
            >
              <span>
                <i className="ri-edit-line"></i>
                Create
              </span>
            </button>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Create;

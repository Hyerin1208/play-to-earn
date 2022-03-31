import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";

import { Container, Row, Col } from "reactstrap";
import "./create.css";

////////////////////////////////////////////////////////////////////
/* 아래는 임시데이터와 img + 카드구조 & css */
import CommonSection from "../ui/CommonSection";
import NftCard from "../ui/NftCard";
import { updateLists } from "../../redux/actions/index";

import defaultImg from "../../assets/images/defaultImg.gif";

/////////////////////////////////////////////////////////////////////

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const Create = () => {
    const [fileUrl, setFileUrl] = useState(defaultImg);
    const [formInput, updateFormInput] = useState({
        price: "00.00",
        name: "noname",
        description: "desc",
    });
    const Account = useSelector((state) => state.AppState.account);
    const CreateNFTContract = useSelector((state) => state.AppState.CreateNFTContract);
    const dispatch = useDispatch();

    // useEffect(async () => {}, []);

    async function onChange(e) {
        const file = e.target.files[0];
        console.log(file);
        try {
            const added = await client.add(file, {
                progress: (prog) => console.log(`received: ${prog}`),
            });
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            setFileUrl(url);
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    }

    async function uploadToIPFS() {
        const { name, description, price } = formInput;
        if (!name || !description || !price || !fileUrl) return;
        /* first, upload to IPFS */
        const data = JSON.stringify({
            name,
            description,
            image: fileUrl,
            price,
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
        const url = await uploadToIPFS();
        /* next, create the item */
        const price = parseInt(formInput.price);
        console.log(Account);
        await CreateNFTContract.methods
            .CreateNFTinContract(url, price)
            .send({ from: Account, gas: 3000000 }, (error, data) => {
                if (!error) {
                    console.log("send ok");
                } else {
                    console.log(error);
                }
            })
            .then(async (res) => {
                let item = {
                    fileUrl: fileUrl,
                    formInput: {
                        tokenid: res.events.NFTItemCreated.returnValues.tokenId,
                        price: formInput.price,
                        name: formInput.name,
                        description: formInput.description,
                    },
                };
                console.log(item);
                dispatch(updateLists({ Selllists: item }));
                await axios.post(`http://localhost:5000/nfts`, { tokenId: res.events.NFTItemCreated.returnValues.tokenId }).then((res) => {
                    console.log(res.data.message);
                    if (res.data.message === "ok") {
                        alert("NFT발급 성공");
                    } else {
                        alert("이미 발급된 번호입니다.");
                    }
                });
            });
    }

    //nft 판매
    async function sellnft(tokenId, price) {
        await CreateNFTContract.methods.sellMyNFTItem(tokenId, price).send({ from: Account, gas: 3000000 }, (error) => {
            if (!error) {
                console.log("send ok");
            } else {
                console.log(error);
            }
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
                            <NftCard
                                item={{
                                    fileUrl: fileUrl,
                                    formInput: formInput,
                                }}
                            />
                            {/* {fileUrl && <NftCard item={item} src={fileUrl} />} */}
                        </Col>

                        <Col lg="9" md="8" sm="6">
                            <div className="create__input">
                                <form>
                                    <div className="form__input">
                                        <label htmlFor="">Upload File</label>
                                        <input type="file" name="Asset" className="upload__input" width="350" src={fileUrl} onChange={onChange} />
                                        {/* {fileUrl && (
                      <img className="rounded mt-4" width="350" src={fileUrl} />
                    )} */}
                                    </div>

                                    <div className="form__input">
                                        <label htmlFor="">Title</label>
                                        <input type="text" placeholder="Enter title" onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })} />
                                    </div>

                                    <div className="form__input">
                                        <label htmlFor="">Price</label>
                                        <input type="number" placeholder="Enter price for one item (ETH)" onChange={(e) => updateFormInput({ ...formInput, price: e.target.value })} />
                                    </div>

                                    {/* 경매 기능 추가시 부가정보 input */}
                                    {/* <div className="form__input">
                    <label htmlFor="">Minimum Bid</label>
                    <input type="number" placeholder="Enter minimum bid" />
                  </div>

                  <div className="date__form">
                    <div className="form__input w-50">
                      <label htmlFor="">Starting Date</label>
                      <input type="date" />
                    </div>

                    <div className="form__input w-50">
                      <label htmlFor="">Expiration Date</label>
                      <input type="date" />
                    </div>
                  </div> */}

                                    <div className="form__input">
                                        <label htmlFor="">Description</label>
                                        <textarea
                                            name=""
                                            id=""
                                            rows="7"
                                            placeholder="Enter Description"
                                            className="w-100"
                                            onChange={(e) =>
                                                updateFormInput({
                                                    ...formInput,
                                                    description: e.target.value,
                                                })
                                            }
                                        ></textarea>
                                    </div>
                                </form>
                            </div>
                        </Col>
                        <button className="create__btn" onClick={() => CreateNFT()}>
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

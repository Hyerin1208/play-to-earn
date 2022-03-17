import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const Test = () => {
    const [fileUrl, setFileUrl] = useState(null);
    const [formInput, updateFormInput] = useState({ price: "", name: "", description: "" });
    const Account = useSelector((state) => state.AppState.account);
    const CreateNFTContract = useSelector((state) => state.AppState.CreateNFTContract);
    const AmusementArcadeTokenContract = useSelector((state) => state.AppState.AmusementArcadeTokenContract);
    const [NFTname, setNFTname] = useState("");
    const [NFTdesc, setNFTdesc] = useState("");
    const [NFTimage, setNFTimage] = useState("");

    console.log(CreateNFTContract);
    console.log(AmusementArcadeTokenContract);

    useEffect(async () => {}, []);

    async function onChange(e) {
        const file = e.target.files[0];
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
        console.log(await CreateNFTContract);
        console.log(typeof (await uploadToIPFS()));
        console.log(typeof price);

        await CreateNFTContract.methods.CreateNFTItem(url, price).send({ from: Account, gas: 3000000 }, (error) => {
            if (!error) {
                console.log("send ok");
            } else {
                console.log(error);
            }
        });
    }

    //내 nft 리스트
    async function mynftlists() {
        const lists = await CreateNFTContract.methods.MyNFTlists().call({ from: Account }, (error) => {
            if (!error) {
                console.log("send ok");
            } else {
                console.log(error);
            }
        });
        console.log(await lists);
    }

    //오너 nft 판매 리스트
    async function ownerselllists() {
        const lists = await CreateNFTContract.methods.OwnerSelllists().call({ from: Account }, (error) => {
            if (!error) {
                console.log("send ok");
            } else {
                console.log(error);
            }
        });
        console.log(await lists);
    }

    //유저 nft 판매 리스트
    async function userselllists() {
        const lists = await CreateNFTContract.methods.UserSelllists().call({ from: Account }, (error) => {
            if (!error) {
                console.log("send ok");
            } else {
                console.log(error);
            }
        });
        console.log(await lists);
    }

    //nft 구매
    async function buynft(tokenId, price) {
        await CreateNFTContract.methods.getNFTItem(tokenId).send({ from: Account, gas: 3000000, value: price }, (error) => {
            if (!error) {
                console.log("send ok");
            } else {
                console.log(error);
            }
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

    //URI 확인
    async function gettokenuri(tokenId) {
        const tokenURI = await CreateNFTContract.methods.tokenURI(tokenId).call({ from: Account }, (error) => {
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
        });
        // const result = await axios.get(tokenURI).then((data) => data.data);
    }
    return (
        <section>
            <h1>UPLOAD TEST</h1>
            <ul>
                <li>
                    <input placeholder="Creater Name" onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })} />
                </li>
                <li>
                    <textarea placeholder="Description" onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })} />
                </li>
                <li>
                    <input type="number" placeholder="Price" onChange={(e) => updateFormInput({ ...formInput, price: e.target.value })} />
                </li>
                <li>
                    <input type="file" name="Asset" className="my-4" onChange={onChange} />
                    {fileUrl && <img className="rounded mt-4" width="350" src={fileUrl} />}
                </li>
                <li>
                    <button onClick={() => CreateNFT()}>Create NFT</button>
                </li>
            </ul>
            <h1>MYNFT</h1>
            <button onClick={() => mynftlists()}>MY NFT lists</button>
            <h1>ownerselllists</h1>
            <button onClick={() => ownerselllists()}>owner sell lists</button>
            <h1>userselllists</h1>
            <button onClick={() => userselllists()}>user sell lists</button>
            <h1>buynft</h1>
            <p>
                tokenID
                <input type="number" id="token_ID" />
            </p>
            <p>
                price
                <input type="number" id="NFT_price" />
            </p>

            <button
                onClick={() => {
                    const tokenID = document.querySelector("#token_ID").value;
                    const nftprice = document.querySelector("#NFT_price").value;
                    buynft(tokenID, nftprice);
                }}
            >
                buynft
            </button>
            <h1>sellnft</h1>
            <p>
                tokenID
                <input type="number" id="sell_token_ID" />
            </p>
            <p>
                price
                <input type="number" id="sell_NFT_price" />
            </p>

            <button
                onClick={() => {
                    const tokenID = document.querySelector("#sell_token_ID").value;
                    const nftprice = document.querySelector("#sell_NFT_price").value;
                    sellnft(tokenID, nftprice);
                }}
            >
                sellnft
            </button>
            <h1>gettokenuri</h1>
            <p>
                tokenID
                <input type="number" id="URI_token_ID" />
            </p>
            <button
                onClick={() => {
                    const tokenID = document.querySelector("#URI_token_ID").value;
                    gettokenuri(tokenID);
                }}
            >
                gettokenuri
            </button>
            <div>{NFTname}</div>
            <div>{NFTdesc}</div>
            <img src={NFTimage} />
        </section>
    );
};

export default Test;

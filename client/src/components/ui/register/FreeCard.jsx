import React, { useState } from "react";

import "./free-item.css";
import { useSelector, useDispatch } from "react-redux";
import { updateLists } from "../../../redux/actions/index";
import { create as ipfsHttpClient } from "ipfs-http-client";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
const FreeCard = (props) => {
    const { title, imgUrl, desc } = props.item;
    const { checkItem, setCheckItem } = props.check;
    const [fileUrl, setFileUrl] = useState(null);
    const Account = useSelector((state) => state.AppState.account);
    const CreateNFTContract = useSelector((state) => state.AppState.CreateNFTContract);
    const dispatch = useDispatch();

    const [checked, setChecked] = useState(false);

    //  const onChange = (e) => {
    //    const { value, index, type, checked } = e.target;
    //    setChecked((state) => ({
    //      ...state,
    //      [index]: type === "checkbox" ? checked : value,
    //    }));
    //  };

    function checkOnlyOne(element) {
        const checkboxes = document.getElementsByClassName("item__choice");

        checkboxes.forEach((cb) => {
            cb.checked = false;
        });

        element.checked = true;
    }

    async function btn() {
        const data = JSON.stringify({
            name: title,
            description: desc,
            image: imgUrl,
        });
        const added = await client.add(data);
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;

        console.log(url);

        // const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        // console.log(url);
        // alert("해당 NFT가 발급 되었습니다");
        setCheckItem(props.item.id);
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
                    fileUrl: imgUrl,
                    formInput: {
                        tokenid: res.events.NFTItemCreated.returnValues.tokenId,
                        price: price,
                        name: title,
                        description: desc,
                    },
                };
                console.log(item);

                dispatch(updateLists({ Selllists: item }));
            });
    }

    return (
        <div className="free__nft__card">
            <label className="free__nftLabel">
                <input
                    className="item__choice"
                    type="checkbox"
                    checked={parseInt(checkItem) === parseInt(props.item.id) ? true : false}
                    onClick={() => setCheckItem(props.item.id)}
                    value={props.item.id}
                    //   value={(e) => e.target}
                />
                <div className="front__card">
                    <div className="free__nft__img">
                        <img src={imgUrl} alt="" />
                    </div>
                    <div className="free__nft__content">
                        <h5 className="free__nft__title">{title}</h5>
                        <div className="free__nft__desc">
                            <p>{desc}</p>
                        </div>
                        <button className="pick__nft" onClick={btn} checked={parseInt(checkItem) === parseInt(props.item.id) ? true : false}>
                            Pick Me
                        </button>
                    </div>
                </div>
            </label>
        </div>
    );
};

export default FreeCard;

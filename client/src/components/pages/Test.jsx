import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { create as ipfsHttpClient } from "ipfs-http-client";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const Test = () => {
    const [fileUrl, setFileUrl] = useState(null);
    const [formInput, updateFormInput] = useState({ price: "", name: "", description: "" });
    const Account = useSelector((state) => state.AppState.account);
    const CreateNFTContract = useSelector((state) => state.AppState.CreateNFTContract);
    const BscsimpletokenContract = useSelector((state) => state.AppState.BscsimpletokenContract);

    console.log(CreateNFTContract);
    console.log(BscsimpletokenContract);

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

    return (
        <section>
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
        </section>
    );
};

export default Test;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Test = () => {
    const Account = useSelector((state) => state.LoadAccounts.account);
    const CreateNameTokenContract = useSelector((state) => state.LoadContracts.CreateNameTokenContract);
    const BscsimpletokenContract = useSelector((state) => state.LoadContracts.BscsimpletokenContract);
    const [CreateSignal, setCreateSignal] = useState(false);
    const [totalNftsupply, setTotalNftsupply] = useState(null);

    console.log(CreateNameTokenContract);
    console.log(BscsimpletokenContract);

    useEffect(async () => {
        const totalNftsupply = await CreateNameTokenContract.methods.balanceOf(Account).call();
        setTotalNftsupply(totalNftsupply);
        setCreateSignal(false);

        // return () => {
        // };
    }, [CreateSignal, CreateNameTokenContract]);

    async function CreateNFT() {
        await CreateNameTokenContract.methods
            .safeMint(Account)
            .estimateGas()
            .then((gas) => {
                CreateNameTokenContract.methods.safeMint(Account).send({ from: Account, gas: gas }, (error) => {
                    if (!error) {
                        console.log("ok");
                        setCreateSignal(true);
                    } else {
                        console.log(error);
                    }
                });
            });
        // await CreateNameTokenContract.methods.safeMint(userAccount).send({ from: userAccount, gas: 300000 }, (error) => {
        // if (!error) {
        //     console.log("worked");
        // } else {
        //     console.log(error);
        // }
        // });
    }
    return (
        <section>
            <h1>테스트필드</h1>
            <h1>NFT총 발행량 : {totalNftsupply}</h1>
            <button onClick={() => CreateNFT()}>NFT 컨트랙트</button>
            <button>BSC 컨트랙트</button>
        </section>
    );
};

export default Test;

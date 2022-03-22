import CreateNFT from "../../contracts/CreateNFT.json";
import AmusementArcadeToken from "../../contracts/AmusementArcadeToken.json";
import Web3 from "web3";
import axios from "axios";

export const APP_STATE = "APP_STATE";
export const CONNECTION_FAILED = "CONNECTION_FAILED";
export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
export const UPDATE_LISTS = "UPDATE_LISTS";

const rpcurl = process.env.REACT_APP_RPC_URL;

const connectSuccess = (payload) => {
    return {
        type: APP_STATE,
        payload: payload,
    };
};

const connectFailed = (payload) => {
    return {
        type: CONNECTION_FAILED,
        payload: payload,
    };
};

const updateAccounts = (payload) => {
    return {
        type: UPDATE_ACCOUNT,
        payload: payload,
    };
};

const updateLists = (payload) => {
    return {
        type: UPDATE_LISTS,
        payload: payload,
    };
};

export function getWeb3() {
    return async (dispatch) => {
        try {
            const web3 = new Web3(rpcurl || "http://127.0.0.1:7545");
            await web3.eth.net
                .isListening()
                .then(async (res) => {
                    console.log(res);
                    const networkId = await web3.eth.net.getId();
                    const networkData_NFT = CreateNFT.networks[networkId];
                    const networkData_Token = AmusementArcadeToken.networks[networkId];
                    if (networkData_NFT && networkData_Token) {
                        const NFT_abi = CreateNFT.abi;
                        const NFT_address = networkData_NFT.address;
                        const CreateNFTContract = new web3.eth.Contract(NFT_abi, NFT_address);
                        const Token_abi = AmusementArcadeToken.abi;
                        const Token_address = networkData_Token.address;
                        const AmusementArcadeTokenContract = new web3.eth.Contract(Token_abi, Token_address);

                        const lists = await CreateNFTContract.methods.OwnerSelllists().call((error) => {
                            if (!error) {
                                console.log("send ok");
                            } else {
                                console.log(error);
                            }
                        });

                        const listsForm = await Promise.all(
                            lists.map(async (i) => {
                                const tokenURI = await CreateNFTContract.methods.tokenURI(i.tokenId).call();
                                const meta = await axios.get(tokenURI).then((res) => res.data);
                                let item = {
                                    fileUrl: await meta.image,
                                    formInput: {
                                        tokenid: i.tokenId,
                                        price: await meta.price,
                                        name: await meta.name,
                                        description: await meta.description,
                                    },
                                };
                                return item;
                            })
                        );

                        dispatch(connectSuccess({ network: res, CreateNFTContract: CreateNFTContract, AmusementArcadeTokenContract: AmusementArcadeTokenContract, OwnerSelllists: listsForm }));
                        // window.ethereum.on("accountsChanged", (accounts) => {
                        //     dispatch(updateAccounts({ accounts: accounts, account: accounts[0] }));
                        // });
                    } else {
                        dispatch(connectFailed("접속네트워크를 확인하세요"));
                    }
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(connectFailed("접속네트워크를 확인하세요"));
                });
        } catch (error) {
            console.log(error);
            dispatch(connectFailed("에러 확인"));
        }
    };
}

export function connectWallet() {
    return async (dispatch) => {
        if (window.ethereum) {
            if ((await window.ethereum._metamask.isUnlocked()) === true && (await window.ethereum.selectedAddress) !== null) {
                console.log("여기1");
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                const account = accounts[0];
                dispatch(updateAccounts({ wallet: true, accounts: accounts, account: accounts[0] }));

                window.ethereum.on("accountsChanged", (accounts) => {
                    dispatch(updateAccounts({ wallet: true, accounts: accounts, account: accounts[0] }));
                });
                window.ethereum.on("disconnect", () => {
                    console.log("다음에봐요~");
                });
            } else {
                console.log("여기2");
                dispatch(updateAccounts({ wallet: false, accounts: null, account: null }));
                document.querySelector("#Connect_Wallet").addEventListener("click", async () => {
                    window.ethereum.enable();
                    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                    const account = accounts[0];
                    dispatch(updateAccounts({ wallet: true, accounts: accounts, account: account }));
                });
            }
        } else {
            console.log("여기3");

            dispatch(connectFailed("메타마스크 설치가 필요합니다."));
            alert("메타마스크 설치가 필요합니다.");
        }

        // document.querySelector("#Connect_Wallet").addEventListener("click", async () => {
        //     if (window.ethereum) {
        //         console.log("여기1");
        //         if (window.ethereum._metamask.isUnlocked() === false || window.ethereum.selectedAddress === null) {
        //             // document.querySelector("#Connect_Wallet").addEventListener("click", async () => {
        //             window.ethereum.enable();
        //             const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        //             const account = accounts[0];
        //             // });
        //         }
        //         // } else {
        //         //     console.log("여기2");
        //         //     const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        //         //     const account = accounts[0];
        //         //     dispatch(updateAccounts({ wallet: true, accounts: accounts, account: accounts[0] }));

        //         //     window.ethereum.on("accountsChanged", (accounts) => {
        //         //         dispatch(updateAccounts({ wallet: true, accounts: accounts, account: accounts[0] }));
        //         //     });
        //         // }
        //     } else {
        //         console.log("여기3");

        //         dispatch(connectFailed("메타마스크 설치가 필요합니다."));
        //         alert("메타마스크 설치가 필요합니다.");
        //     }
        // });
    };
}

// export function checkWallet() {
//     return async (dispatch) => {
//         if (window.ethereum) {
//             if ((await window.ethereum._metamask.isUnlocked()) === true && (await window.ethereum.selectedAddress) !== null) {
//                 console.log("여기2");
//                 const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//                 const account = accounts[0];
//                 dispatch(updateAccounts({ wallet: true, accounts: accounts, account: accounts[0] }));

//                 window.ethereum.on("accountsChanged", (accounts) => {
//                     dispatch(updateAccounts({ wallet: true, accounts: accounts, account: accounts[0] }));
//                 });
//             } else {
//                 dispatch(updateAccounts({ wallet: false, accounts: null, account: null }));
//             }
//         }
//     };
// }

// export function getWeb3() {
//     return async (dispatch) => {
//         if (window.ethereum) {
//             if (window.ethereum._metamask.isUnlocked() === false || window.ethereum.selectedAddress === null) {
//                 window.ethereum.enable();
//             }
//             const web3 = new Web3(window.ethereum);
//             try {
//                 await window.ethereum.enable();
//                 const accounts = await web3.eth.getAccounts();
//                 const networkId = await web3.eth.net.getId();
//                 const networkData_NFT = CreateNFT.networks[networkId];
//                 const networkData_Token = AmusementArcadeToken.networks[networkId];
//                 if (networkData_NFT && networkData_Token) {
//                     const NFT_abi = CreateNFT.abi;
//                     const NFT_address = networkData_NFT.address;
//                     const CreateNFTContract = new web3.eth.Contract(NFT_abi, NFT_address);
//                     const Token_abi = AmusementArcadeToken.abi;
//                     const Token_address = networkData_Token.address;
//                     const AmusementArcadeTokenContract = new web3.eth.Contract(Token_abi, Token_address);
//                     dispatch(connectSuccess({ accounts: accounts, account: accounts[0], CreateNFTContract: CreateNFTContract, AmusementArcadeTokenContract: AmusementArcadeTokenContract }));

//                     window.ethereum.on("accountsChanged", (accounts) => {
//                         dispatch(updateAccounts({ accounts: accounts, account: accounts[0] }));
//                     });
//                 } else {
//                     dispatch(connectFailed("접속네트워크를 확인하세요"));
//                 }
//             } catch (error) {
//                 console.log(error);
//                 dispatch(connectFailed("에러 확인"));
//             }
//         } else {
//             dispatch(connectFailed("메타마스크 필요"));
//         }
//     };
// }

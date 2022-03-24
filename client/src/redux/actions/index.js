import CreateNFT from "../../contracts/CreateNFT.json";
import AmusementArcadeToken from "../../contracts/AmusementArcadeToken.json";
import Web3 from "web3";
import axios from "axios";

export const APP_STATE = "APP_STATE";
export const CONNECTION_FAILED = "CONNECTION_FAILED";
export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
export const UPDATE_LISTS = "UPDATE_LISTS";

const rpcurl = process.env.REACT_APP_RPC_URL;

export const connectSuccess = (payload) => {
    return {
        type: APP_STATE,
        payload: payload,
    };
};

export const connectFailed = (payload) => {
    return {
        type: CONNECTION_FAILED,
        payload: payload,
    };
};

export const updateAccounts = (payload) => {
    return {
        type: UPDATE_ACCOUNT,
        payload: payload,
    };
};

export const updateLists = (payload) => {
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
                        dispatch(
                            connectSuccess({
                                network: res,
                                CreateNFTContract: CreateNFTContract,
                                AmusementArcadeTokenContract: AmusementArcadeTokenContract,
                                OwnerSelllists: listsForm,
                                errorMsg: "",
                            })
                        );
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

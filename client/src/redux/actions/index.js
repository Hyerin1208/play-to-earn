import CreateNFT from "../../contracts/CreateNFT.json";
import AmusementArcadeToken from "../../contracts/AmusementArcadeToken.json";
import TokenClaim from "../../contracts/TokenClaim.json";
import StakingToken from "../../contracts/StakingToken.json";
import Web3 from "web3";
import axios from "axios";
import { utils } from "ethers";

export const APP_STATE = "APP_STATE";
export const CONNECTION_FAILED = "CONNECTION_FAILED";
export const CALL_CONTRACT = "CALL_CONTRACT";
export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
export const UPDATE_SELLLISTS = "UPDATE_SELLLISTS";
export const UPDATE_MYLISTS = "UPDATE_MYLISTS";
export const UPDATE_MYBALANCE = "UPDATE_MYBALANCE";
export const MY_MODAL = "MY_MODAL";
export const SET_TIMER = "SET_TIMER";
export const CHANGE_CHAINID = "CHANGE_CHAINID";
export const REFRESH_SELLLISTS = "REFRESH_SELLLISTS";

export const SET_NFTS = "SET_NFTS";
export const SELECTED_NFT = "SELECTED_NFT";
// export  const  REMOVE_SELECTED_NFT = "REMOVE_SELECTED_NFT";

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

export const callContract = (payload) => {
  return {
    type: CALL_CONTRACT,
    payload: payload,
  };
};

export const updateAccounts = (payload) => {
  return {
    type: UPDATE_ACCOUNT,
    payload: payload,
  };
};

export const updateSellLists = (payload) => {
  console.log(payload);
  return {
    type: UPDATE_SELLLISTS,
    payload: payload,
  };
};

export const setNfts = (payload) => {
  return {
    type: SET_NFTS,
    payload: payload,
  };
};

export const selectNfts = (payload) => {
  return {
    type: SELECTED_NFT,
    payload: payload,
  };
};

export const updateMyLists = (payload) => {
  console.log(payload);
  return {
    type: UPDATE_MYLISTS,
    payload: payload,
  };
};

export const updateMyBalance = (payload) => {
  return {
    type: UPDATE_MYBALANCE,
    payload: payload,
  };
};

export const mymodal = (payload) => {
  return {
    type: MY_MODAL,
    payload: payload,
  };
};

export const setTimer = (payload) => {
  return {
    type: SET_TIMER,
    payload: payload,
  };
};

export const changeChainid = (payload) => {
  return {
    type: CHANGE_CHAINID,
    payload: payload,
  };
};
export const refreshSellLists = (payload) => {
  return {
    type: REFRESH_SELLLISTS,
    payload: payload,
  };
};

export function connect() {
  return async (dispatch) => {
    try {
      const web3 = new Web3(rpcurl || "http://127.0.0.1:7545");
      await web3.eth.net
        .isListening()
        .then(async (res) => {
          const givenNetworkId = await web3.eth.net.getId();
          const networkId = Object.keys(CreateNFT.networks)[0];
          console.log(givenNetworkId);
          console.log(networkId);
          if (
            parseInt(givenNetworkId) === parseInt(networkId) &&
            res === true
          ) {
            const networkData_NFT = CreateNFT.networks[networkId];
            const NFT_abi = CreateNFT.abi;
            const NFT_address = networkData_NFT.address;
            const CreateNFTContract = new web3.eth.Contract(
              NFT_abi,
              NFT_address
            );
            const Owner = await CreateNFTContract.methods.owner().call();
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
            await axios
              .post("http://127.0.0.1:5000/user/owner", { address: Owner })
              .then((res) => {
                dispatch(
                  connectSuccess({
                    network: true,
                    networkid: parseInt(givenNetworkId),
                    Owner: Owner,
                    timer: parseInt(res.data.count),
                    Selllists: listsForm,
                    errorMsg: "",
                  })
                );
              });
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

export function getWeb3(Provider) {
  return async (dispatch) => {
    try {
      if (Provider !== undefined) {
        const web3js = new Web3(Provider);
        const givenNetworkId = await web3js.eth.net.getId();
        const networkId = Object.keys(CreateNFT.networks)[0];
        if (
          parseInt(givenNetworkId) === parseInt(networkId) ||
          parseInt(givenNetworkId) === 1337
        ) {
          const networkData_NFT = CreateNFT.networks[networkId];
          const networkData_Token = AmusementArcadeToken.networks[networkId];
          const networkData_TokenClaim = TokenClaim.networks[networkId];
          const networkData_StakingToken = StakingToken.networks[networkId];
          const NFT_abi = CreateNFT.abi;
          const NFT_address = networkData_NFT.address;
          const CreateNFTContract = new web3js.eth.Contract(
            NFT_abi,
            NFT_address
          );
          const Token_abi = AmusementArcadeToken.abi;
          const Token_address = networkData_Token.address;
          const AmusementArcadeTokenContract = new web3js.eth.Contract(
            Token_abi,
            Token_address
          );
          const TokenClaim_abi = TokenClaim.abi;
          const TokenClaim_address = networkData_TokenClaim.address;
          const TokenClaimContract = new web3js.eth.Contract(
            TokenClaim_abi,
            TokenClaim_address
          );
          const StakingToken_abi = StakingToken.abi;
          const StakingToken_address = networkData_StakingToken.address;
          const StakingTokenContract = new web3js.eth.Contract(
            StakingToken_abi,
            StakingToken_address
          );
          window.StakingTokenContract = StakingTokenContract;

          dispatch(
            callContract({
              CreateNFTContract: CreateNFTContract,
              AmusementArcadeTokenContract: AmusementArcadeTokenContract,
              TokenClaimContract: TokenClaimContract,
              StakingTokenContract: StakingTokenContract,
            })
          );
        } else {
          dispatch(
            callContract({
              CreateNFTContract: "dismatch",
              AmusementArcadeTokenContract: "dismatch",
              TokenClaimContract: "dismatch",
              StakingTokenContract: "dismatch",
            })
          );
        }
      } else {
        dispatch(
          callContract({
            CreateNFTContract: null,
            AmusementArcadeTokenContract: null,
            TokenClaimContract: null,
            StakingTokenContract: null,
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(connectFailed("에러 확인"));
    }
  };
}

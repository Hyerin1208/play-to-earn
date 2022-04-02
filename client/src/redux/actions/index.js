import CreateNFT from "../../contracts/CreateNFT.json";
import AmusementArcadeToken from "../../contracts/AmusementArcadeToken.json";
import TokenClaim from "../../contracts/TokenClaim.json";
import Web3 from "web3";
import axios from "axios";

export const APP_STATE = "APP_STATE";
export const CONNECTION_FAILED = "CONNECTION_FAILED";
export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
export const UPDATE_LISTS = "UPDATE_LISTS";
export const UPDATE_MYLISTS = "UPDATE_MYLISTS";

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
  return {
    type: UPDATE_MYLISTS,
    payload: payload,
  };
};

export function getWeb3() {
  return async (dispatch) => {
    try {
      // const web3 = new Web3(window.ethereum);
      const web3 = new Web3(rpcurl || "http://127.0.0.1:7545");
      await web3.eth.net
        .isListening()
        .then(async (res) => {
          const networkId = await web3.eth.net.getId();
          const networkData_NFT = CreateNFT.networks[networkId];
          const networkData_Token = AmusementArcadeToken.networks[networkId];
          const networkData_TokenClaim = TokenClaim.networks[networkId];
          if (networkData_NFT && networkData_Token) {
            const NFT_abi = CreateNFT.abi;
            const NFT_address = networkData_NFT.address;
            const CreateNFTContract = new web3.eth.Contract(
              NFT_abi,
              NFT_address
            );
            window.web3.CreateNFTContract = CreateNFTContract;
            const Token_abi = AmusementArcadeToken.abi;
            const Token_address = networkData_Token.address;
            const AmusementArcadeTokenContract = new web3.eth.Contract(
              Token_abi,
              Token_address
            );
            window.web3.AmusementArcadeTokenContract =
              AmusementArcadeTokenContract;
            const TokenClaim_abi = TokenClaim.abi;
            const TokenClaim_address = networkData_TokenClaim.address;
            const TokenClaimContract = new web3.eth.Contract(
              TokenClaim_abi,
              TokenClaim_address
            );
            window.web3.TokenClaimContract = TokenClaimContract;

            const lists = await CreateNFTContract.methods
              .Selllists()
              .call((error) => {
                if (!error) {
                  console.log("send ok");
                } else {
                  console.log(error);
                }
              });

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
                TokenClaimContract: TokenClaimContract,
                Selllists: listsForm,
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

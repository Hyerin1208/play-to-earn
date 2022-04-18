import CreateNFT from "../../contracts/CreateNFT.json";
import AmusementArcadeToken from "../../contracts/AmusementArcadeToken.json";
import TokenClaim from "../../contracts/TokenClaim.json";
import Web3 from "web3";
import axios from "axios";

export const APP_STATE = "APP_STATE";
export const CONNECTION_FAILED = "CONNECTION_FAILED";
export const CALL_CONTRACT = "CALL_CONTRACT";
export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
export const UPDATE_LISTS = "UPDATE_LISTS";
export const UPDATE_MYLISTS = "UPDATE_MYLISTS";
export const UPDATE_MYBALANCE = "UPDATE_MYBALANCE";
export const MY_MODAL = "MY_MODAL";

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

export function connect() {
  return async (dispatch) => {
    try {
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
                    tokenId: i.tokenId,
                    price: i.price,
                    star: i.star,
                    rare: i.rare,
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
                Owner: Owner,
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

export function getWeb3() {
  return async (dispatch) => {
    try {
      const web3js = new Web3(Web3.givenProvider);
      const givenNetworkId = await web3js.eth.net.getId();
      const networkId = Object.keys(CreateNFT.networks)[0];
      if (parseInt(givenNetworkId) === parseInt(networkId)) {
        const networkData_NFT = CreateNFT.networks[givenNetworkId];
        const networkData_Token = AmusementArcadeToken.networks[givenNetworkId];
        const networkData_TokenClaim = TokenClaim.networks[givenNetworkId];
        const NFT_abi = CreateNFT.abi;
        const NFT_address = networkData_NFT.address;
        const CreateNFTContract = new web3js.eth.Contract(NFT_abi, NFT_address);
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
        dispatch(
          callContract({
            CreateNFTContract: CreateNFTContract,
            AmusementArcadeTokenContract: AmusementArcadeTokenContract,
            TokenClaimContract: TokenClaimContract,
          })
        );
      } else {
        dispatch(
          callContract({
            CreateNFTContract: "dismatch",
            AmusementArcadeTokenContract: "dismatch",
            TokenClaimContract: "dismatch",
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(connectFailed("에러 확인"));
    }
  };
}

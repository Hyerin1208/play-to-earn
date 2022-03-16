import CreateNFT from "../../contracts/CreateNFT.json";
import Bscsimpletoken from "../../contracts/Bscsimpletoken.json";
import Web3 from "web3";

export const APP_STATE = "APP_STATE";
export const CONNECTION_FAILED = "CONNECTION_FAILED";
export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";

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

export function getWeb3() {
    return async (dispatch) => {
        if (window.ethereum) {
            if (window.ethereum._metamask.isUnlocked() === false || window.ethereum.selectedAddress === null) {
                window.ethereum.enable();
            }
            const web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
                const accounts = await web3.eth.getAccounts();
                const networkId = await web3.eth.net.getId();
                const networkData_NFT = CreateNFT.networks[networkId];
                const networkData_Token = Bscsimpletoken.networks[networkId];
                if (networkData_NFT && networkData_Token) {
                    const NFT_abi = CreateNFT.abi;
                    const NFT_address = networkData_NFT.address;
                    const CreateNFTContract = new web3.eth.Contract(NFT_abi, NFT_address);
                    const Token_abi = Bscsimpletoken.abi;
                    const Token_address = networkData_Token.address;
                    const BscsimpletokenContract = new web3.eth.Contract(Token_abi, Token_address);
                    dispatch(connectSuccess({ accounts: accounts, account: accounts[0], CreateNFTContract: CreateNFTContract, BscsimpletokenContract: BscsimpletokenContract }));

                    window.ethereum.on("accountsChanged", (accounts) => {
                        dispatch(updateAccounts({ accounts: accounts, account: accounts[0] }));
                    });
                } else {
                    dispatch(connectFailed("접속네트워크를 확인하세요"));
                }
            } catch (error) {
                console.log(error);
                dispatch(connectFailed("에러 확인"));
            }
        } else {
            dispatch(connectFailed("메타마스크 필요"));
        }
    };
}
// export async function getWeb3() {
//     if (window.ethereum) {
//         if (window.ethereum._metamask.isUnlocked() === false || window.ethereum.selectedAddress === null) {
//             window.ethereum.enable();
//         }
//         const web3 = new Web3(window.ethereum);
//         try {
//             await window.ethereum.enable();
//             const accounts = await web3.eth.getAccounts();
//             const networkId = await web3.eth.net.getId();
//             const networkData_NFT = CreateNFT.networks[networkId];
//             const networkData_Token = Bscsimpletoken.networks[networkId];
//             if (networkData_NFT && networkData_Token) {
//                 const NFT_abi = CreateNFT.abi;
//                 const NFT_address = networkData_NFT.address;
//                 const CreateNFTContract = new web3.eth.Contract(NFT_abi, NFT_address);
//                 const Token_abi = Bscsimpletoken.abi;
//                 const Token_address = networkData_Token.address;
//                 const BscsimpletokenContract = new web3.eth.Contract(Token_abi, Token_address);
//                 return {
//                     type: APP_STATE,
//                     payload: { accounts: accounts, account: accounts[0], CreateNFTContract: CreateNFTContract, BscsimpletokenContract: BscsimpletokenContract },
//                 };
//             } else {
//                 return console.log("접속네트워크를 확인하세요");
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     } else {
//         return console.log("메타마스크가 필요");
//     }
// }

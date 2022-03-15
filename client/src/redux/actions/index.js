import CreateNFT from "../../contracts/CreateNFT.json";
import Bscsimpletoken from "../../contracts/Bscsimpletoken.json";
import Web3 from "web3";

export const APP_STATE = "APP_STATE";

export async function getWeb3() {
    if (window.ethereum) {
        if ((await window.ethereum._metamask.isUnlocked()) === false || (await window.ethereum.selectedAddress) === null) {
            await window.ethereum.enable();
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
                return {
                    type: APP_STATE,
                    payload: { accounts: accounts, account: accounts[0], CreateNFTContract: CreateNFTContract, BscsimpletokenContract: BscsimpletokenContract },
                };
            } else {
                return console.log("접속네트워크를 확인하세요");
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        return console.log("메타마스크가 필요");
    }
}

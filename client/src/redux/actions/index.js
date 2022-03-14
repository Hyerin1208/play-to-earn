import CreateNameToken from "../../contracts/CreateNameToken.json";
import Bscsimpletoken from "../../contracts/Bscsimpletoken.json";
import Web3 from "web3";

export const LOAD_ACCOUNTS = "LOAD_ACCOUNTS";
export const LOAD_CONTRACTS = "LOAD_CONTRACTS";

async function getWeb3() {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            return web3;
        } catch (error) {
            console.log(error);
        }
    } else if (window.web3) {
        const web3 = window.web3;
        return web3;
    } else {
        const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
        const web3 = new Web3(provider);
        return web3;
    }

    // const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
    // const web3 = new Web3(provider);
    // return web3;
}

export const loadWeb3Account = async () => {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    return {
        type: LOAD_ACCOUNTS,
        payload: { accounts: accounts, account: accounts[0] },
    };
};

export const loadWebContract = async () => {
    const web3 = await getWeb3();
    const networkId = await web3.eth.net.getId();
    const networkData_NFT = CreateNameToken.networks[networkId];
    const networkData_Token = Bscsimpletoken.networks[networkId];
    if (networkData_NFT && networkData_Token) {
        const NFT_abi = CreateNameToken.abi;
        const NFT_address = networkData_NFT.address;
        const CreateNameTokenContract = new web3.eth.Contract(NFT_abi, NFT_address);
        const Token_abi = Bscsimpletoken.abi;
        const Token_address = networkData_Token.address;
        const BscsimpletokenContract = new web3.eth.Contract(Token_abi, Token_address);
        return {
            type: LOAD_CONTRACTS,
            payload: { CreateNameTokenContract: CreateNameTokenContract, BscsimpletokenContract: BscsimpletokenContract },
        };
    }
};

import CreateNameToken from "../../contracts/CreateNameToken.json";
import Bscsimpletoken from "../../contracts/Bscsimpletoken.json";

export const LOAD_ACCOUNTS = "LOAD_ACCOUNTS";
export const LOAD_CONTRACTS = "LOAD_CONTRACTS";

export const loadWeb3Account = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    return {
        type: LOAD_ACCOUNTS,
        payload: { accounts: accounts, account: accounts[0] },
    };
};

export const loadWebContract = async (web3) => {
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

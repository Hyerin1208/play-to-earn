import { APP_STATE } from "../actions";

const initialState = {
    accounts: null,
    account: null,
    CreateNFTContract: null,
    BscsimpletokenContract: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case APP_STATE:
            return {
                ...initialState,
                accounts: action.payload.accounts,
                account: action.payload.accounts[0],
                CreateNFTContract: action.payload.CreateNFTContract,
                BscsimpletokenContract: action.payload.BscsimpletokenContract,
            };
        default:
            return state;
    }
}

import { APP_STATE, CONNECTION_FAILED, UPDATE_ACCOUNT } from "../actions";

const initialState = {
    loading: false,
    accounts: null,
    account: null,
    CreateNFTContract: null,
    AmusementArcadeToken: null,
    errorMsg: "",
};

export default function (state = initialState, action) {
    switch (action.type) {
        case APP_STATE:
            return {
                ...initialState,
                loading: true,
                accounts: action.payload.accounts,
                account: action.payload.accounts[0],
                CreateNFTContract: action.payload.CreateNFTContract,
                AmusementArcadeToken: action.payload.AmusementArcadeToken,
            };
        case CONNECTION_FAILED:
            return {
                ...initialState,
                errorMsg: action.payload,
            };
        case UPDATE_ACCOUNT:
            return {
                ...state,
                accounts: action.payload.accounts,
                account: action.payload.account,
            };
        default:
            return state;
    }
}

import { APP_STATE, CONNECTION_FAILED, UPDATE_ACCOUNT, UPDATE_LISTS } from "../actions";

const initialState = {
    network: false,
    wallet: false,
    accounts: null,
    account: null,
    CreateNFTContract: null,
    AmusementArcadeTokenContract: null,
    Selllists: [],
    errorMsg: "",
};

export default function (state = initialState, action) {
    switch (action.type) {
        case APP_STATE:
            return {
                ...state,
                network: action.payload.network,
                CreateNFTContract: action.payload.CreateNFTContract,
                AmusementArcadeTokenContract: action.payload.AmusementArcadeTokenContract,
                Selllists: action.payload.Selllists,
                errorMsg: action.payload.errorMsg,
            };
        case CONNECTION_FAILED:
            return {
                ...initialState,
                errorMsg: action.payload.errorMsg,
            };
        case UPDATE_ACCOUNT:
            return {
                ...state,
                wallet: action.payload.wallet,
                accounts: action.payload.accounts,
                account: action.payload.account,
            };
        case UPDATE_LISTS:
            return {
                ...state,
                Selllists: [...state.Selllists, action.payload.Selllists],
            };
        default:
            return state;
    }
}

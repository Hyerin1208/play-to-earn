import {
  APP_STATE,
  CONNECTION_FAILED,
  UPDATE_ACCOUNT,
  UPDATE_LISTS,
  UPDATE_MYLISTS,
} from "../actions";

const initialState = {
  network: false,
  wallet: false,
  accounts: null,
  account: null,
  CreateNFTContract: null,
  AmusementArcadeTokenContract: null,
  TokenClaimContract: null,
  Selllists: [],
  MyNFTlists: null,
  errorMsg: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case APP_STATE:
      return {
        ...state,
        network: action.payload.network,
        CreateNFTContract: action.payload.CreateNFTContract,
        AmusementArcadeTokenContract:
          action.payload.AmusementArcadeTokenContract,
        TokenClaimContract: action.payload.TokenClaimContract,
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
        MyNFTlists: action.payload.MyNFTlists,
      };
    case UPDATE_LISTS:
      return {
        ...state,
        Selllists: [...state.Selllists, action.payload.Selllists],
      };
    case UPDATE_MYLISTS:
      return {
        ...state,
        MyNFTlists: action.payload.MyNFTlists,
      };
    default:
      return state;
  }
}

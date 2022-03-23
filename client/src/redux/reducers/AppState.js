import {
  APP_STATE,
  CONNECTION_FAILED,
  UPDATE_ACCOUNT,
  UPDATE_LISTS,
} from "../actions";

const initialState = {
  network: false,
  wallet: false,
  accounts: null,
  account: null,
  CreateNFTContract: null,
  AmusementArcadeTokenContract: null,
  OwnerSelllists: null,
  errorMsg: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case APP_STATE:
      return {
        ...initialState,
        network: action.payload.network,
        wallet: action.payload.wallet,
        accounts: action.payload.accounts,
        account: action.payload.account,
        CreateNFTContract: action.payload.CreateNFTContract,
        AmusementArcadeTokenContract:
          action.payload.AmusementArcadeTokenContract,
        OwnerSelllists: action.payload.OwnerSelllists,
        errorMsg: action.payload.errorMsg,
      };
    case CONNECTION_FAILED:
      return {
        ...initialState,
        CreateNFTContract: action.payload.CreateNFTContract,
        AmusementArcadeTokenContract:
          action.payload.AmusementArcadeTokenContract,
        OwnerSelllists: action.payload.OwnerSelllists,
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
        OwnerSelllists: action.payload.OwnerSelllists,
      };
    default:
      return state;
  }
}

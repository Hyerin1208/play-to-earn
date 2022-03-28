import { combineReducers } from "redux";
import AppState from "./AppState";
import { nftsReducer } from "./nftsReducer";

const rootReducer = combineReducers({
  AppState,
  allNfts: nftsReducer,
});

export default rootReducer;

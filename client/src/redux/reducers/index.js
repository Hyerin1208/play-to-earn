import { combineReducers } from "redux";
import AppState from "./AppState";
import NftsReducer from "./NftsReducer";

const rootReducer = combineReducers({
  AppState,
  NftsReducer,
});

export default rootReducer;

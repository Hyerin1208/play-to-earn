import { combineReducers } from "redux";
import LoadAccounts from "./LoadAccounts";
import LoadContracts from "./LoadContracts";

const rootReducer = combineReducers({
    LoadAccounts,
    LoadContracts,
});

export default rootReducer;

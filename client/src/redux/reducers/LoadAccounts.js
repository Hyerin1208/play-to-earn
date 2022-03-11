import { LOAD_ACCOUNTS } from "../actions";

const initialState = {
    accounts: null,
    account: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_ACCOUNTS:
            return {
                ...initialState,
                accounts: action.payload.accounts,
                account: action.payload.account,
            };
        default:
            return state;
    }
}

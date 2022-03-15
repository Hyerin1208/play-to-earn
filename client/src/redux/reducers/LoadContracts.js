import { LOAD_CONTRACTS } from "../actions";

const initialState = {
    CreateNameTokenContract: null,
    BscsimpletokenContract: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_CONTRACTS:
            return {
                ...initialState,
                CreateNameTokenContract: action.payload.CreateNameTokenContract,
                BscsimpletokenContract: action.payload.BscsimpletokenContract,
            };
        default:
            return state;
    }
}

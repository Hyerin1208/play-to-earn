import { SET_NFTS, SELECTED_NFT } from "../actions";

const initialState = {
  name: null,
  description: null,
  image: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_NFTS:
      return {
        ...initialState,
        name: action.payload.name,
        description: action.payload.description,
        image: action.payload.image,
      };
    default:
      return state;
  }
}

// NftReducer.js 수정
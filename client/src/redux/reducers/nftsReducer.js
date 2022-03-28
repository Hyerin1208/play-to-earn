import { ActionTypes } from "../contants/action-types";

const initialState = {
  nfts: [
    {
      name: "title",
      description: "desc",
      image: "imgUrl",
    },
  ],
};

export const nftsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_NFTS:
      return state;
    default:
      return state;
  }
};

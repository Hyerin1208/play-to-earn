import { ActionTypes } from "../contants/action-types";

export const setNfts = (nfts) => {
  return {
    type: ActionTypes.SET_NFTS,
    payload: nfts,
  };
};

export const selectedNft = (nfts) => {
  return {
    type: ActionTypes.SELECTED_NFT,
    payload: nfts,
  };
};

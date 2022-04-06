import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactLoaing from "react-loading";
import "./modal.css";

const Modal = (props) => {
  const [Loading, setLoading] = useState(true);
  const Account = useSelector((state) => state.AppState.account);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  useEffect(async () => {
    setLoading(null);
  }, [CreateNFTContract]);

  //nft 구매
  async function buynft(tokenId, price) {
    if (CreateNFTContract === null) {
      setLoading(true);
    } else {
      await CreateNFTContract.methods
        .getNFTItem(tokenId)
        .send({ from: Account, gas: 3000000, value: price }, (error) => {
          if (!error) {
            console.log("send ok");
          } else {
            console.log(error);
          }
        });
      window.location.reload();
      setLoading(false);
    }
  }

  if (Loading) {
    return (
      <div>
        잠시만 기다려 주세요
        <ReactLoaing type={"bars"} color={"purple"} height={375} width={375} />
      </div>
    );
  } else {
    return (
      <div className="modal__wrapper">
        return (
        <div className="single__modal">
          <span className="close__modal">
            <i
              className="ri-close-line"
              onClick={() => props.setShowModal(false)}
            ></i>
          </span>
          <h4 className="text-center text-light">Current price</h4>

          <div className="buy__nfts">
            <div className="must__bid">
              <p>You must bid at least</p>
              <span className="money"> {props.item.formInput.price} ETH</span>
            </div>

            <div className="must__bid">
              <p>Gas Fee</p>
              <span className="money"> ETH</span>
            </div>

            <div className="must__bid">
              <p>Total Bid Amount</p>
              <span className="money">{props.item.formInput.price} ETH</span>
            </div>
          </div>
          <button
            className="place__bid-btn"
            onClick={async () => {
              await buynft(
                props.item.formInput.tokenId,
                props.item.formInput.price
              );
            }}
          >
            Buy now
          </button>
        </div>
      </div>
    );
  }
};

export default Modal;

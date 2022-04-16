import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactLoaing from "react-loading";
import "./modal.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Modal = (props) => {
  const [Loading, setLoading] = useState(true);
  let params = useParams();

  const account = useSelector((state) => state.AppState.account);

  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );
  // const card_id = params.card_id;
  // const owner = CreateNFTContract.methods.ownerOf(card_id).call();
  // console.log(owner);

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
        .send({ from: account, gas: 3000000, value: price }, (error) => {
          if (!error) {
            console.log("send ok");
          } else {
            console.log(error);
          }
        })
        .then(async (res) => {
          console.log(typeof res.events.Transfer.returnValues.tokenId);
          console.log(res.events.Transfer.returnValues.from);
          console.log(res.events.Transfer.returnValues.to);
          await axios
            .post(`http://localhost:5000/history`, {
              tokenId: res.events.Transfer.returnValues.tokenId,
              from: res.events.Transfer.returnValues.from,
              to: res.events.Transfer.returnValues.to,
              // date: new Date().getTime(),
            })
            .then((res) => {
              console.log(res.data.message);
              if (res.data.message === "ok") {
                console.log(res.data.message);
              } else {
                console.log(res.data.message);
              }
            });
        });

      window.location.reload();
      setLoading(false);
    }
  }

  // const sendHistory = async (tokenId) => {
  //   console.log("여기");
  //   // console.log(new Date().getTime());

  // };

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
              <p>Top bid</p>
              <span className="money"> {props.item.formInput.price} ETH</span>
            </div>

            <div className="must__bid">
              <p>Sale ends</p>
              <span className="money">April 22, 2022 at 2:44am</span>
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

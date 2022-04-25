import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactLoaing from "react-loading";
import "./modal.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { utils } from "ethers";

const Modal = (props) => {
  const [Loading, setLoading] = useState(true);
  let params = useParams();

  const account = useSelector((state) => state.AppState.account);

  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );
  const networkid = useSelector((state) => state.AppState.networkid);
  const chainid = useSelector((state) => state.AppState.chainid);

  useEffect(async () => {
    console.log(props);
    setLoading(null);
  }, [CreateNFTContract]);
  // utils.formatUnits(price, 18)
  //nft 구매
  async function buynft(tokenId, price) {
    if (CreateNFTContract === null) {
      setLoading(true);
    } else {
      if (chainid === 1337 ? false : networkid === chainid ? false : true)
        return alert("네트워크 아이디를 확인하세요");
      await CreateNFTContract.methods
        .getNFTItem(parseInt(tokenId))
        .send({ from: account, gas: 3000000, value: price }, (error) => {
          if (!error) {
            console.log("send ok");
          } else {
            console.log(error);
          }
        })
        .then(async (res) => {
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
              <span className="money"> {props.item.formInput.price} AAT</span>
            </div>
            <h5 className="text-center text-light">
              현재 작업은 토큰전송과 함께 가스비가 발생합니다. 진행하시겠습니까?
            </h5>
            {/* 
            <div className="must__bid">
              <p>Sale ends</p>
              <span className="money">April 22, 2022 at 2:44am</span>
            </div>

            <div className="must__bid">
              <p>Total Bid Amount</p>
              <span className="money">{props.item.formInput.price} AAT</span>
            </div> */}
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

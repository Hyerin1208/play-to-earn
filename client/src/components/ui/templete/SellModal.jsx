import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactLoaing from "react-loading";

import axios from "axios";

import "./sell-modal.css";

const SellModal = (props) => {
  const [Loading, setLoading] = useState(true);
  const Account = useSelector((state) => state.AppState.account);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  const [form, setForm] = useState({
    tokenId: Number(props.item.tokenId),
    price: Number(props.item.price),
  });

  useEffect(async () => {
    setLoading(null);
  }, [CreateNFTContract, Account]);

  //nft 판매
  async function sellnft(tokenId, price) {
    if (CreateNFTContract === null) {
      setLoading(true);
    } else {
      const lists = await CreateNFTContract.methods
        .MyNFTlists()
        .call({ from: Account }, (error) => {
          if (!error) {
            console.log("send ok");
          } else {
            console.log(error);
          }
        });
      const result = await Promise.all(
        lists.filter((i) => {
          if (i.tokenId == tokenId) {
            return true;
          }
        })
      ).then(async (res) => {
        if (res[0].sell === false) {
          await CreateNFTContract.methods
            .sellMyNFTItem(tokenId, price)
            .send({ from: Account, gas: 3000000 }, (error) => {
              if (!error) {
                console.log("send ok");
              } else {
                console.log(error);
              }
            })
            .then(() => {
              setLoading(false);
              window.location.reload();
            });
        } else {
          if (window.confirm("팔고있어요 가격 바꿀려구요?")) {
            alert("바꾸긴했어요...");
          } else {
            alert("탁월한 선택@@@@@@");
          }
        }
      });
      // const result = await Promise.all(
      //   lists.filter((i) => {
      //     if (i.tokenId == tokenId) {
      //       return true;
      //     }
      //   })
      // );
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
      <div className="modal2__wrapper">
        <div className="single2__modal">
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
              <span className="money"> {props.item.price} ETH</span>
            </div>

            <div className="must__bid">
              <div className="input__item mb-4">
                <input
                  type="number"
                  placeholder="00 . 00 ETH"
                  onChange={(e) =>
                    setForm({ ...form, price: Number(e.target.value) })
                  }
                />
              </div>
            </div>

            <div className="must__bid">
              <p>Total Bid Amount</p>
              <span className="money">{form.price} ETH</span>
            </div>
          </div>
          <button
            className="place__bid-btn"
            onClick={async () => {
              await sellnft(form.tokenId, form.price);
            }}
          >
            Sell Now
          </button>
        </div>
      </div>
    );
  }
};

export default SellModal;

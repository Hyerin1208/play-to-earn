import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateMyLists, updateSellLists } from "../../../redux/actions";
import ReactLoaing from "react-loading";

import axios from "axios";
import "./sell-modal.css";
import { utils } from "ethers";

const SellModal = (props) => {
  const [Loading, setLoading] = useState(true);
  const Account = useSelector((state) => state.AppState.account);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );
  const MyNFTlists = useSelector((state) => state.AppState.MyNFTlists);
  const Selllists = useSelector((state) => state.AppState.Selllists);
  const networkid = useSelector((state) => state.AppState.networkid);
  const chainid = useSelector((state) => state.AppState.chainid);
  const [form, setForm] = useState({
    tokenId: Number(props.item.tokenId),
    price: Number(props.item.price),
  });
  const dispatch = useDispatch();

  useEffect(async () => {
    setLoading(null);
  }, [CreateNFTContract, Account]);

  //nft 판매
  async function sellnft(tokenId, price) {
    if (CreateNFTContract === null) {
      setLoading(true);
    } else {
      if (chainid === 1337 ? false : networkid === chainid ? false : true)
        return alert("네트워크 아이디를 확인하세요");
      let selectIndex;
      const selectNFT = await MyNFTlists.filter((lists, index) => {
        if (parseInt(lists.formInput.tokenid) === parseInt(tokenId)) {
          console.log(index);
          selectIndex = index;
          return true;
        }
      });
      if (selectNFT[0].formInput.sell === false) {
        await CreateNFTContract.methods
          .sellMyNFTItem(tokenId, utils.parseEther(price.toString()))
          .send({ from: Account, gas: 3000000 }, (error) => {
            if (!error) {
              console.log("send ok");
            } else {
              console.log(error);
            }
          })
          .then(() => {
            setLoading(false);
            MyNFTlists[selectIndex].formInput.sell = true;
            MyNFTlists[selectIndex].formInput.price = price.toString();
            dispatch(updateMyLists({ MyNFTlists: MyNFTlists }));
            dispatch(
              updateSellLists({
                Selllists: [...Selllists, MyNFTlists[selectIndex]],
              })
            );
            props.setShowModal(false);
            props.setCheckChange(!props.checkChange);
            // window.location.reload();
          });
      } else {
        if (window.confirm("판매중인 NFT입니다.\n판매가격을 바꾸시겠어요?")) {
          console.log(utils.parseUnits(price.toString(), 18));
          await CreateNFTContract.methods
            .sellMyNFTItem(tokenId, utils.parseUnits(price.toString(), 18))
            .send({ from: Account, gas: 3000000 }, (error) => {
              if (!error) {
                console.log("send ok");
              } else {
                console.log(error);
              }
            })
            .then(() => {
              setLoading(false);
              MyNFTlists[selectIndex].formInput.price = price.toString();
              dispatch(updateMyLists({ MyNFTlists: MyNFTlists }));
              const sellindex = Selllists.findIndex((lists) => {
                if (Number(lists.formInput.tokenid) === Number(tokenId)) {
                  return true;
                }
              });
              if (sellindex !== -1) {
                Selllists[sellindex].formInput.price = price.toString();
                dispatch(
                  updateSellLists({
                    Selllists: [...Selllists],
                  })
                );
              }
              props.setShowModal(false);
              // window.location.reload();
            });
        } else {
          alert("현재가격을 유지합니다.");
          props.setShowModal(false);
        }
      }
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
              <span className="money"> {props.item.price} AAT</span>
            </div>

            <div className="must__bid">
              <div className="input__item mb-4">
                <input
                  type="number"
                  placeholder="00 . 00 ETH"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      price: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="must__bid">
              <p>Total Bid Amount</p>
              <span className="money">{form.price} AAT</span>
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

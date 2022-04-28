import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateMyLists, updateSellLists } from "../../../redux/actions";
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";

import "./sell-modal.css";
import { utils } from "ethers";

const SellModal = (props) => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #5900ff;
    width: 100%;
    height: 100%;
    background: #34343465;
  `;
  const [Loading, setLoading] = useState(false);
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

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  }
  //nft 판매
  async function sellnft(tokenId, price) {
    props.setShowModal(false);
    if (CreateNFTContract === null) {
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
        props.setLoading(true);
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
            MyNFTlists[selectIndex].formInput.sell = true;
            MyNFTlists[selectIndex].formInput.price = price.toString();
            dispatch(updateMyLists({ MyNFTlists: MyNFTlists }));
            dispatch(
              updateSellLists({
                Selllists: [...Selllists, MyNFTlists[selectIndex]],
              })
            );
            //sleep(2000);
            props.setLoading(false);
            props.setCheckChange(!props.checkChange);
          });
      } else {
        if (window.confirm("판매중인 NFT입니다.\n판매가격을 바꾸시겠어요?")) {
          console.log(utils.parseUnits(price.toString(), 18));
          props.setLoading(true);
          await CreateNFTContract.methods
            .sellMyNFTItem(tokenId, utils.parseUnits(price.toString(), 18))
            .send({ from: Account, gas: 3000000 }, (error) => {
              if (!error) {
                console.log("send ok");
              } else {
                //sleep(2000);
                props.setLoading(false);
                console.log(error);
              }
            })
            .then(() => {
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
              //sleep(2000);
              props.setLoading(false);
            });
        } else {
          //sleep(2000);
          props.setLoading(false);
          alert("현재가격을 유지합니다.");
        }
      }
    }
  }

  return (
    <div className="modal2__wrapper">
      {Loading ? (
        <div
          className={Loading ? "parentDisable" : ""}
          width="100%"
          height="100%"
        >
          <div className="overlay-box">
            <FadeLoader
              size={150}
              color={"#ffffff"}
              css={override}
              loading={Loading}
              z-index={"1"}
              text="Loading your content..."
            />
          </div>
        </div>
      ) : (
        false
      )}
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
};

export default SellModal;

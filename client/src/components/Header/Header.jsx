import React, { useRef, useEffect, useState } from "react";
import "./header.css";
// 로고 만들어서 아래 넣을예정
//import logo from "../../assets/images/loader.gif";
import { Container } from "reactstrap";

import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector, useStore } from "react-redux";
import MetaMaskOnboarding from "@metamask/onboarding";
import { updateAccounts, connectFailed } from "../../redux/actions/index";
import axios from "axios";
const NAV__LINKS = [
  {
    display: "Home",
    url: "/",
  },
  {
    display: "Market",
    url: "/market",
  },
  {
    display: "Create",
    url: "/create",
  },
  {
    display: "Game",
    url: "/game",
  },
  {
    display: "Contact",
    url: "/contact",
  },
  {
    display: "TestField",
    url: "/test",
  },
];
const Header = () => {
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );
  const [showWalletModal, setShowWalletModal] = useState(false);
  const wallet = useSelector((state) => state.AppState.wallet);
  const [isDisabled, setDisabled] = useState(false);
  const [account, setAccount] = useState("연결이 필요합니다.");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  async function MyList(account) {
    if (CreateNFTContract !== null) {
      const MyNFTlists = await CreateNFTContract.methods
        .MyNFTlists()
        .call({ from: account }, (error) => {
          if (!error) {
            console.log("send ok");
          } else {
            console.log(error);
          }
        });

      const listsForm = await Promise.all(
        MyNFTlists.map(async (i) => {
          const tokenURI = await CreateNFTContract.methods
            .tokenURI(i.tokenId)
            .call();
          const meta = await axios.get(tokenURI).then((res) => res.data);
          let item = {
            fileUrl: await meta.image,
            formInput: {
              tokenid: i.tokenId,
              price: await meta.price,
              name: await meta.name,
              description: await meta.description,
            },
          };
          return item;
        })
      );

      return await listsForm;
    } else {
      return null;
    }
  }

  useEffect(async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if ((await window.ethereum._metamask.isUnlocked()) === true) {
        console.log("메타있는데 안잠겼지롱~");
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        dispatch(
          updateAccounts({
            wallet: true,
            accounts: accounts,
            account: account,
            MyNFTlists: await MyList(account),
          })
        );
        setAccount(account);
        setDisabled(true);

        await window.ethereum.on("accountsChanged", async (accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setDisabled(true);
            return dispatch(
              updateAccounts({
                wallet: true,
                accounts: accounts,
                account: accounts[0],
                MyNFTlists: await MyList(accounts[0]),
              })
            );
          } else {
            setAccount("연결이 필요합니다.");
            setDisabled(false);
            return dispatch(
              updateAccounts({
                wallet: false,
                accounts: null,
                account: null,
                MyNFTlists: [],
              })
            );
          }
        });
      } else {
        console.log("메타있는데 잠김");
        dispatch(
          updateAccounts({
            wallet: false,
            accounts: null,
            account: null,
            MyNFTlists: [],
          })
        );
        setDisabled(false);
      }
    } else {
      dispatch(
        connectFailed({
          errorMsg: "메타마스크가 필요합니다.",
        })
      );
    }

    return () => {
      window.ethereum.off("accountsChanged", () => {
        dispatch(
          updateAccounts({
            wallet: false,
            accounts: null,
            account: null,
            MyNFTlists: [],
          })
        );
        setDisabled(false);
      });
    };
  }, [dispatch, CreateNFTContract]);

  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");

  async function checkWallet() {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      dispatch(
        updateAccounts({
          wallet: true,
          accounts: accounts,
          account: account,
          MyNFTlists: MyList(account),
        })
      );
      setAccount(account);
      setDisabled(true);
    } else {
      alert("메타마스크 설치하세요");
    }
  }

  const walletButton = () => {
    return (
      <button className="connect_btn" onClick={() => checkWallet()}>
        <span>
          <i className="ri-wallet-line"></i>
        </span>
        Connect Wallet
      </button>
    );
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="navigation">
          <div className="logo">
            <h2>
              <span>
                <i className="ri-bear-smile-line">
                  {/* <img src={logo} alt="loading..." /> */}
                </i>
              </span>
              NFTs
            </h2>
          </div>

          <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
            <ul className="nav__list">
              {NAV__LINKS.map((item, index) => (
                <li className="nav__item" key={index}>
                  <NavLink
                    to={item.url}
                    className={(navClass) =>
                      navClass.isActive ? "active" : ""
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__right">
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="admin__btn">
              <Link to="/admin">
                <i className="ri-admin-line"></i>
              </Link>
            </div>

            {isDisabled === false ? (
              walletButton()
            ) : (
              <div>
                <div className="mypage__user__icon">
                  <Link to="/mypage">
                    <i className="ri-user-3-line"></i>
                  </Link>
                  {account}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;

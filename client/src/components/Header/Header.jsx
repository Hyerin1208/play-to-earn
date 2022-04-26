import React, { useRef, useEffect, useState } from "react";
import "./header.css";
import { useCookies } from "react-cookie";
import logoPng from "../../assets/images/logoPng.png";
import { ethers } from "ethers";
import { Container } from "reactstrap";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

import {
  updateAccounts,
  changeChainid,
  getWeb3,
} from "../../redux/actions/index";
import axios from "axios";
import { utils } from "ethers";

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
    display: "Evolution",
    url: "/upgrade",
  },
  // {
  //   display: "TestField",
  //   url: "/test",
  // },
];

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "5bd970f2bf6047318bda7b13eb3c24ce",
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      infuraId: "5bd970f2bf6047318bda7b13eb3c24ce", // Required
    },
  },
  binancechainwallet: {
    package: true,
    options: {
      infuraId: "5bd970f2bf6047318bda7b13eb3c24ce", // Required
    },
  },
};

const web3Modal = new Web3Modal({
  network: "mainnet" || "binance" || "testnet",
  cacheProvider: true,
  providerOptions: providerOptions,
  theme: {
    background: "rgb(20, 19, 29)",
    main: "rgb(199, 199, 199)",
    secondary: "rgb(136, 136, 136)",
    border: "rgba(195, 195, 195, 0.14)",
    hover: "rgba(36, 9, 66, 0.596)",
  },
});

// connectToWeb3 = async () => {
//   const provider = await this.state.web3Modal.connect();
//   const web3 = new Web3(provider);

//   localStorage.setItem('WEB3_CONNECTED', 'true');

//   this.setState({
//     web3,
//     provider,
//   });
//   await this.loadBlockchainData();
//   await this.getLiquidityOwner(this.state.tokenAData, this.state.tokenBData);
// };

const Header = () => {
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );
  const Owner = useSelector((state) => state.AppState.Owner);
  const isUser = useSelector((state) => state.AppState.isUser);
  const [isDisabled, setDisabled] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const TokenClaimContract = useSelector(
    (state) => state.AppState.TokenClaimContract
  );

  // Web3modal instance
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();
  const Navi = useNavigate();

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      dispatch(getWeb3(provider));
      const selectAccount = utils.getAddress(accounts[0]);
      if (accounts) setAccount(selectAccount);
      setProvider(provider);
      setLibrary(library);
      setChainId(network);
      await axios
        .post("http://127.0.0.1:5000/user/login", {
          address: selectAccount,
          owner: Owner,
        })
        .then(async (res) => {
          dispatch(
            updateAccounts({
              wallet: true,
              account: selectAccount,
              isUser: res.data.nick === "noname" ? false : true,
              MyNFTlists: await MyList(selectAccount),
              Mybalance: await checkMyBalance(selectAccount),
            })
          );
          dispatch(
            changeChainid({
              chainid: network.chainId,
            })
          );
          setDisabled(true);
        });
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setDisabled(false);
    setIsOwner(false);
    setVerified(undefined);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    console.log(await web3Modal.clearCachedProvider());
    refreshState();
    dispatch(
      updateAccounts({
        wallet: false,
        account: null,
        isUser: false,
        MyNFTlists: null,
        Mybalance: 0,
      })
    );
  };

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = async (accounts) => {
        console.log("accountsChanged", accounts);
        disconnect();
        Navi("/");
        if (accounts.length !== 0) {
          const getAddress = utils.getAddress(accounts[0]);
          await axios
            .post("http://127.0.0.1:5000/user/login", {
              address: getAddress,
              owner: Owner,
            })
            .then(async (res) => {
              dispatch(
                updateAccounts({
                  wallet: true,
                  account: getAddress,
                  isUser: res.data.nick === "noname" ? false : true,
                  MyNFTlists: await MyList(getAddress),
                  Mybalance: await checkMyBalance(getAddress),
                })
              );
            })
            .then(async () => {
              setAccount(getAddress);
              setDisabled(true);
            });
        } else {
          disconnect();
        }
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(parseInt(_hexChainId));
        dispatch(
          changeChainid({
            chainid: parseInt(_hexChainId),
          })
        );
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
        dispatch(
          updateAccounts({
            wallet: false,
            account: null,
            isUser: false,
            MyNFTlists: null,
            Mybalance: 0,
          })
        );
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

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

  useEffect(() => {
    if (Owner === account) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [account, Owner]);

  // async function checkOwner(account) {
  //     console.log(Owner);
  //     console.log(account);
  //     if (Owner === account) {
  //         setIsOwner(true);
  //     } else {
  //         setIsOwner(false);
  //     }
  // }

  async function MyList(account) {
    if (CreateNFTContract !== null && CreateNFTContract !== "dismatch") {
      const MyNFTlists = await CreateNFTContract.methods
        .MyNFTlists()
        .call({ from: account });
      const listsForm = await Promise.all(
        MyNFTlists.map(async (i) => {
          console.log(i);
          const tokenURI = await CreateNFTContract.methods
            .tokenURI(i.tokenId)
            .call();
          const meta = await axios.get(tokenURI).then((res) => res.data);
          let item = {
            fileUrl: await meta.image,
            formInput: {
              tokenid: i.tokenId,
              price: utils.formatEther(i.price),
              rare: i.rare,
              star: i.star,
              sell: i.sell,
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
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [Owner]);

  async function checkMyBalance(account) {
    if (TokenClaimContract !== null && TokenClaimContract !== "dismatch") {
      const Mybalance = await TokenClaimContract.methods
        .mybalance()
        .call({ from: account });
      return utils.formatUnits(await Mybalance, 18);
    } else {
      return 0;
    }
  }

  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");

  const walletButton = (isDisabled) => {
    if (isDisabled === false) {
      return (
        <button className="connect_btn" onClick={connectWallet}>
          <span>
            <i className="ri-wallet-line"></i>
          </span>
          Connect Wallet
        </button>
      );
    }
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="navigation">
          <div className="logo">
            <img
              src={logoPng}
              alt=""
              style={{
                width: "60px",
                height: "50px",
                marginLeft: "10%",
                marginBottom: "10px",
              }}
            />
          </div>

          <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
            <ul className="nav__list">
              {NAV__LINKS.map((item, index) => {
                if (item.display === "Create" || item.display === "Evolution") {
                  return (
                    <li
                      className="nav__item"
                      id={`nav__item__${item.display}`}
                      hidden={isUser || isOwner ? false : true}
                      key={index}
                      onClick={() => {
                        if (
                          CreateNFTContract === null ||
                          CreateNFTContract === "dismatch"
                        ) {
                          alert(
                            "접속네트워크를 확인하세요\n테스트넷 접속 필요"
                          );
                        }
                      }}
                    >
                      <NavLink
                        to={item.url}
                        className={(navClass) =>
                          navClass.isActive ? "active" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  );
                } else {
                  return (
                    <li
                      className="nav__item"
                      id={`nav__item__${item.display}`}
                      key={index}
                    >
                      <NavLink
                        to={item.url}
                        className={(navClass) =>
                          navClass.isActive ? "active" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  );
                }
              })}
            </ul>
          </div>

          <div className="nav__right">
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>
            <div className="admin__btn" hidden={!isOwner}>
              <Link to="/admin">
                <i className="ri-admin-line"></i>
              </Link>
            </div>

            {isDisabled === false ? (
              walletButton(isDisabled)
            ) : (
              <div className="user__logined">
                {/* <button className="connect_btn" onClick={disconnect}>
                  <span>
                    <i className="ri-wallet-line"></i>
                  </span>
                  Disconnect
                </button> */}
                <div className="mypage__user__icon">
                  <Link to="/mypage" hidden={!isUser}>
                    <i className="ri-user-3-line"></i>
                  </Link>

                  {/* </input> */}
                  <input
                    className="account__input"
                    type="button"
                    value={
                      account
                        ? `${account.slice(0, 7)}...${account.slice(
                            35
                          )} / Disconnect`
                        : false
                    }
                    onClick={disconnect}
                  />
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

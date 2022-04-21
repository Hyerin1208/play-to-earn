import React, { useRef, useEffect, useState } from "react";
import "./header.css";
import { useCookies } from "react-cookie";
import logoPng from "../../assets/images/logoPng.png";
import { ethers } from "ethers";
import { Container } from "reactstrap";

import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector, useStore } from "react-redux";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

import { updateAccounts, changeChainid } from "../../redux/actions/index";
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
  {
    display: "TestField",
    url: "/test",
  },
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
};

const web3Modal = new Web3Modal({
  network: "mainnet",
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

  const [cookies, setCookie, removeCookie] = useCookies(["rememberAddress"]);

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

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      console.log(library);
      console.log(accounts);
      console.log(network);
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);

      const checkUser = await axios
        .post("http://127.0.0.1:5000/user/login", {
          address: accounts[0],
          owner: Owner,
        })
        .then((res) => res.data.nick);

      dispatch(
        updateAccounts({
          chainid: network.chainId,
          wallet: true,
          account: accounts[0],
          isUser: checkUser === "noname" ? false : true,
          MyNFTlists: await MyList(accounts[0]),
          Mybalance: await checkMyBalance(accounts[0]),
        })
      );
      await checkOwner(accounts[0]);
      setDisabled(true);
    } catch (error) {
      setError(error);
    }
  };

  // const switchNetwork = async () => {
  //   try {
  //     await library.provider.request({
  //       method: "wallet_switchEthereumChain",
  //       params: [{ chainId: toHex(network) }],
  //     });
  //   } catch (switchError) {
  //     if (switchError.code === 4902) {
  //       try {
  //         await library.provider.request({
  //           method: "wallet_addEthereumChain",
  //           params: [networkParams[toHex(network)]],
  //         });
  //       } catch (error) {
  //         setError(error);
  //       }
  //     }
  //   }
  // };

  // const signMessage = async () => {
  //   if (!library) return;
  //   try {
  //     const signature = await library.provider.request({
  //       method: "personal_sign",
  //       params: [message, account],
  //     });
  //     setSignedMessage(message);
  //     setSignature(signature);
  //   } catch (error) {
  //     setError(error);
  //   }
  // };

  // const verifyMessage = async () => {
  //   if (!library) return;
  //   try {
  //     const verify = await library.provider.request({
  //       method: "personal_ecRecover",
  //       params: [signedMessage, signature],
  //     });
  //     setVerified(verify === account.toLowerCase());
  //   } catch (error) {
  //     setError(error);
  //   }
  // };

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
    refreshState();
  };

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = async (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts.length !== 0) {
          const getAddress = utils.getAddress(accounts[0]);
          const checkUser = await axios
            .post("http://127.0.0.1:5000/user/login", {
              address: getAddress,
              owner: Owner,
            })
            .then((res) => res.data.nick);
          dispatch(
            updateAccounts({
              chainid: parseInt(provider.chainId),
              wallet: true,
              account: getAddress,
              isUser: checkUser === "noname" ? false : true,
              MyNFTlists: await MyList(getAddress),
              Mybalance: await checkMyBalance(getAddress),
            })
          );
          await checkOwner(getAddress);
          setAccount(getAddress);
          setDisabled(true);
        } else {
          disconnect();
          dispatch(
            updateAccounts({
              chainid: false,
              wallet: false,
              account: null,
              isUser: false,
              MyNFTlists: null,
              Mybalance: 0,
            })
          );
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
            chainid: false,
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

  // useEffect(() => {
  //   if (cookies.rememberAddress === undefined) {
  //     if (Account !== null) {
  //       setCookie("rememberAddress", Account, { maxAge: 30 });
  //     }
  //   } else {
  //     removeCookie("rememberAddress");
  //   }
  // }, [Account]);

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
    // return () => {
    //     window.removeEventListener("scroll");
    // };
  }, []);

  async function checkOwner(account) {
    if (Owner === account) {
      console.log("오너임");
      setIsOwner(true);
    } else {
      console.log("유저임");
      setIsOwner(false);
    }
  }

  async function MyList(account) {
    if (CreateNFTContract !== null && CreateNFTContract !== "dismatch") {
      const MyNFTlists = await CreateNFTContract.methods
        .MyNFTlists()
        .call({ from: account });
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
              price: i.price,
              rare: i.rare,
              star: i.star,
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
    console.log(this);

    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [Owner]);

  async function checkMyBalance(account) {
    if (TokenClaimContract !== null && TokenClaimContract !== "dismatch") {
      const Mybalance = await TokenClaimContract.methods
        .mybalance()
        .call({ from: account });

      return await Mybalance;
    } else {
      return 0;
    }
  }

  // useEffect(() => {
  //   if (!onboarding.current) {
  //     onboarding.current = new MetaMaskOnboarding();
  //   }
  // }, []);

  // useEffect(async () => {
  //   if (MetaMaskOnboarding.isMetaMaskInstalled()) {
  //     if ((await window.ethereum.selectedAddress) !== null) {
  //       const walletAddress = utils.getAddress(
  //         await window.ethereum.selectedAddress
  //       );
  //       await axios
  //         .post("http://127.0.0.1:5000/user/login", { address: walletAddress })
  //         .then(async (res) => {
  //           if (res.data.nick !== "noname") {
  //             setAccounts([walletAddress]);
  //           }
  //         });
  //     }
  //   }
  // }, [Owner]);

  // useEffect(async () => {
  //   if (MetaMaskOnboarding.isMetaMaskInstalled()) {
  //     if (account.length > 0) {
  //       const getAddress = utils.getAddress(account);
  //       const checkUser = await axios
  //         .post("http://127.0.0.1:5000/user/login", {
  //           address: getAddress,
  //           owner: Owner,
  //         })
  //         .then((res) => res.data.nick);

  //       dispatch(
  //         updateAccounts({
  //           wallet: true,
  //           account: getAddress,
  //           isUser: checkUser === "noname" ? false : true,
  //           MyNFTlists: await MyList(getAddress),
  //           Mybalance: await checkMyBalance(getAddress),
  //         })
  //       );
  //       await checkOwner(getAddress);
  //       setDisabled(true);
  //       await window.ethereum.on("accountsChanged", async (accounts) => {
  //         if (accounts[0] === undefined) {
  //           setDisabled(false);
  //         } else {
  //           setAccount(accounts);
  //         }
  //       });
  //       // onboarding.current.stopOnboarding();
  //       await window.ethereum.on("chainChanged", (_chainId) =>
  //         window.location.reload()
  //       );
  //     } else {
  //       setIsOwner(false);
  //       setDisabled(false);
  //     }
  //   }
  // }, [account]);

  // useEffect(async () => {
  //   if (isOwner) {
  //     const getAddress = utils.getAddress(account);
  //     await axios
  //       .post("http://127.0.0.1:5000/user/owner", { address: getAddress })
  //       .then((res) => console.log(res.data.message));
  //   }
  // }, [isOwner]);

  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");

  // async function checkWallet() {
  //   if (MetaMaskOnboarding.isMetaMaskInstalled()) {
  //     window.ethereum
  //       .request({ method: "eth_requestAccounts" })
  //       .then((newAccounts) => setAccounts(newAccounts));
  //   } else {
  //     if (
  //       window.confirm(
  //         "메타마스크 설치가 필요합니다.\n설치페이지로 이동하시겠습니까?"
  //       )
  //     ) {
  //       onboarding.current.startOnboarding();
  //     }
  //   }
  // }

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
            {/* <h2>
              <span>
                <i className="ri-bear-smile-line"> */}
            {/* <img src={logo} alt="loading..." /> */}
            {/*  </i>
              </span>
              NFTs
            </h2> */}
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

          {/* <div className="web3__modal">
            {!account ? (
              <Button onClick={connectWallet}>Connect Wallet</Button>
            ) : (
              <Button onClick={disconnect}>Disconnect</Button>
            )}
          </div> */}

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
                <button className="connect_btn" onClick={disconnect}>
                  <span>
                    <i className="ri-wallet-line"></i>
                  </span>
                  Disconnect
                </button>
                <div className="mypage__user__icon">
                  <Link to="/mypage" hidden={!isUser}>
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

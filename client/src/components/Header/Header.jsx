import React, { useRef, useEffect, useState } from "react";
import "./header.css";
import { useCookies } from "react-cookie";
import logoPng from "../../assets/images/logoPng.png";
import { Button, Container } from "reactstrap";

import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector, useStore } from "react-redux";
import MetaMaskOnboarding from "@metamask/onboarding";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

import { providers } from "ethers";

import { updateAccounts } from "../../redux/actions/index";
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
  const [accounts, setAccounts] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const onboarding = useRef();

  const Account = useSelector((state) => state.AppState.account);
  const TokenClaimContract = useSelector(
    (state) => state.AppState.TokenClaimContract
  );

  const [cookies, setCookie, removeCookie] = useCookies(["rememberAddress"]);
  // Web3modal instance
  const web3ModalRef = useRef();

  const getSignerOrProvider = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new provider.web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      alert("Use RINKEEBY NETWORK");
      throw new Error("Change network to Rinkeby");
    }
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
  };

  useEffect(() => {
    web3ModalRef.current = new Web3Modal({
      network: "rinkeby",
      theme: "dark",
      //   cacheProvider: true,
      providerOptions: {},
    });
    console.log("FdFSDf", web3ModalRef.current);
  }, []);

  useEffect(() => {
    if (cookies.rememberAddress === undefined) {
      if (Account !== null) {
        setCookie("rememberAddress", Account, { maxAge: 30 });
      }
    } else {
      removeCookie("rememberAddress");
    }
  }, [Account]);

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
      setIsOwner(true);
    } else {
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

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if ((await window.ethereum.selectedAddress) !== null) {
        const walletAddress = utils.getAddress(
          await window.ethereum.selectedAddress
        );
        await axios
          .post("http://127.0.0.1:5000/user/login", { address: walletAddress })
          .then(async (res) => {
            if (res.data.nick !== "noname") {
              setAccounts([walletAddress]);
            }
          });
      }
    }
  }, [Owner]);

  useEffect(async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        const getAddress = utils.getAddress(accounts[0]);
        const checkUser = await axios
          .post("http://127.0.0.1:5000/user/login", {
            address: getAddress,
            owner: Owner,
          })
          .then((res) => res.data.nick);

        dispatch(
          updateAccounts({
            wallet: true,
            account: getAddress,
            isUser: checkUser === "noname" ? false : true,
            MyNFTlists: await MyList(getAddress),
            Mybalance: await checkMyBalance(getAddress),
          })
        );
        await checkOwner(getAddress);
        setDisabled(true);
        await window.ethereum.on("accountsChanged", async (accounts) => {
          if (accounts[0] === undefined) {
            setDisabled(false);
          } else {
            setAccounts(accounts);
          }
        });
        // onboarding.current.stopOnboarding();
        await window.ethereum.on("chainChanged", (_chainId) =>
          window.location.reload()
        );
      } else {
        setIsOwner(false);
        setDisabled(false);
      }
    }
  }, [accounts]);

  useEffect(async () => {
    if (isOwner) {
      const getAddress = utils.getAddress(accounts[0]);
      await axios
        .post("http://127.0.0.1:5000/user/owner", { address: getAddress })
        .then((res) => console.log(res.data.message));
    }
  }, [isOwner]);

  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");

  async function checkWallet() {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((newAccounts) => setAccounts(newAccounts));
    } else {
      if (
        window.confirm(
          "메타마스크 설치가 필요합니다.\n설치페이지로 이동하시겠습니까?"
        )
      ) {
        onboarding.current.startOnboarding();
      }
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

          <div className="web3__modal">
            <Button
              text="Connect to Wallet"
              onClick={() => console.log("Yes connected")}
            />
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
              walletButton()
            ) : (
              <div>
                <div className="mypage__user__icon">
                  <Link to="/mypage" hidden={!isUser}>
                    <i className="ri-user-3-line"></i>
                  </Link>
                  {utils.getAddress(accounts[0])}
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

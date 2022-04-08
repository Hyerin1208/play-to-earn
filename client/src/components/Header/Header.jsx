import React, { useRef, useEffect, useState } from "react";
import "./header.css";
import { useCookies } from "react-cookie";

import logoPng from "../../assets/images/logoPng.png";

// 로고 만들어서 아래 넣을예정
//import logo from "../../assets/images/loader.gif";
import { Container } from "reactstrap";

import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector, useStore } from "react-redux";
import MetaMaskOnboarding from "@metamask/onboarding";
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
    const CreateNFTContract = useSelector((state) => state.AppState.CreateNFTContract);
    const Owner = useSelector((state) => state.AppState.Owner);
    const isUser = useSelector((state) => state.AppState.isUser);
    const [isDisabled, setDisabled] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const onboarding = useRef();

    const Account = useSelector((state) => state.AppState.account);

    const [cookies, setCookie, removeCookie] = useCookies(["rememberAddress"]);

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
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
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
        if (CreateNFTContract !== null) {
            const MyNFTlists = await CreateNFTContract.methods.MyNFTlists().call();

            const listsForm = await Promise.all(
                MyNFTlists.map(async (i) => {
                    const tokenURI = await CreateNFTContract.methods.tokenURI(i.tokenId).call();
                    const meta = await axios.get(tokenURI).then((res) => res.data);
                    let item = {
                        fileUrl: await meta.image,
                        formInput: {
                            tokenid: i.tokenId,
                            price: i.price,
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
        if (!onboarding.current) {
            onboarding.current = new MetaMaskOnboarding();
        }
    }, []);

    useEffect(async () => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            if ((await window.ethereum.selectedAddress) !== null) {
                const walletAddress = utils.getAddress(await window.ethereum.selectedAddress);
                await axios.post("http://127.0.0.1:5000/user/login", { address: walletAddress }).then(async (res) => {
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
                const checkUser = await axios.post("http://127.0.0.1:5000/user/login", { address: getAddress }).then((res) => res.data.nick);
                dispatch(
                    updateAccounts({
                        wallet: true,
                        account: getAddress,
                        isUser: checkUser === "noname" ? false : true,
                        MyNFTlists: await MyList(getAddress),
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
            } else {
                setIsOwner(false);
                setDisabled(false);
            }
        }
    }, [accounts]);

    useEffect(async () => {
        if (isOwner) {
            const getAddress = utils.getAddress(accounts[0]);
            await axios.post("http://127.0.0.1:5000/user/owner", { address: getAddress }).then((res) => console.log(res.data.message));
        }
    }, [isOwner]);

    const toggleMenu = () => menuRef.current.classList.toggle("active__menu");

    async function checkWallet() {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum.request({ method: "eth_requestAccounts" }).then((newAccounts) => setAccounts(newAccounts));
        } else {
            if (window.confirm("메타마스크 설치가 필요합니다.\n설치페이지로 이동하시겠습니까?")) {
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
                                if (item.display === "Create") {
                                    return (
                                        <li className="nav__item" id={`nav__item__${item.display}`} hidden={isUser || isOwner ? false : true} key={index}>
                                            <NavLink to={item.url} className={(navClass) => (navClass.isActive ? "active" : "")}>
                                                {item.display}
                                            </NavLink>
                                        </li>
                                    );
                                } else {
                                    return (
                                        <li className="nav__item" id={`nav__item__${item.display}`} key={index}>
                                            <NavLink to={item.url} className={(navClass) => (navClass.isActive ? "active" : "")}>
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

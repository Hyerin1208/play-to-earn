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

const ONBOARD_TEXT = "Click here to install MetaMask!";
const CONNECT_TEXT = "Connect";
const CONNECTED_TEXT = "Connected";

const Header = () => {
    const dispatch = useDispatch();
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const CreateNFTContract = useSelector((state) => state.AppState.CreateNFTContract);
    const Owner = useSelector((state) => state.AppState.Owner);
    const isUser = useSelector((state) => state.AppState.isUser);
    const [showWalletModal, setShowWalletModal] = useState(false);
    const wallet = useSelector((state) => state.AppState.wallet);
    const [isDisabled, setDisabled] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const onboarding = useRef();

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add("header__shrink");
            } else {
                headerRef.current.classList.remove("header__shrink");
            }
        });
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);

    async function checkOwner(account) {
        if (CreateNFTContract !== null) {
            if (Owner.toLowerCase() === account) {
                console.log("트루");
                setIsOwner(true);
            } else {
                console.log("펄스");
                setIsOwner(false);
            }
        } else {
            console.log("펄스");
            setIsOwner(false);
        }
    }

    async function MyList(account) {
        if (CreateNFTContract !== null) {
            const MyNFTlists = await CreateNFTContract.methods.MyNFTlists().call({ from: account }, (error) => {
                if (!error) {
                    console.log("send ok");
                } else {
                    console.log(error);
                }
            });

            const listsForm = await Promise.all(
                MyNFTlists.map(async (i) => {
                    const tokenURI = await CreateNFTContract.methods.tokenURI(i.tokenId).call();
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

    useEffect(() => {
        if (!onboarding.current) {
            onboarding.current = new MetaMaskOnboarding();
        }
    }, []);

    useEffect(async () => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            if (accounts.length > 0) {
                const checkUser = await axios.post("http://127.0.0.1:5000/user/login", { address: accounts[0] }).then((res) => res.data.nick);
                dispatch(
                    updateAccounts({
                        wallet: true,
                        accounts: accounts,
                        account: accounts[0],
                        isUser: checkUser === "noname" ? false : true,
                        MyNFTlists: await MyList(accounts[0]),
                    })
                );
                checkOwner(accounts[0]);
                setDisabled(true);
                await window.ethereum.on("accountsChanged", async (accounts) => setAccounts(accounts));
                onboarding.current.stopOnboarding();
            } else {
                setDisabled(false);
                setIsOwner(false);
            }
        }
    }, [accounts]);

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
                        <h2>
                            <span>
                                <i className="ri-bear-smile-line">{/* <img src={logo} alt="loading..." /> */}</i>
                            </span>
                            NFTs
                        </h2>
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
                                    <Link to="/mypage">
                                        <i className="ri-user-3-line"></i>
                                    </Link>
                                    {accounts[0]}
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

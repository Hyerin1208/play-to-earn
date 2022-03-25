import React, { useRef, useEffect, useState } from "react";
import "./header.css";
// 로고 만들어서 아래 넣을예정
//import logo from "../../assets/images/loader.gif";
import { Container } from "reactstrap";

import { Link, NavLink } from "react-router-dom";

import WalletModal from "../ui/WalletModal";
import { useDispatch, useSelector } from "react-redux";
import { updateAccounts } from "../../redux/actions/index";

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

  const [showWalletModal, setShowWalletModal] = useState(false);
  const wallet = useSelector((state) => state.AppState.wallet);
  const account = useSelector((state) => state.AppState.account);

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

  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");

  const checkwallet = () => {
    return (
      <div className="nav__right">
        <button
          className="btn"
          id="Connect_Wallet"
          onClick={() => connectWallet()}
        >
          <span>
            <i className="ri-wallet-line"></i>
          </span>
          Connect Wallet
        </button>
        <span className="mobile__menu">
          <i className="ri-menu-line" onClick={toggleMenu}></i>
        </span>
      </div>
    );
  };

  async function connectWallet() {
    if (window.ethereum) {
      window.ethereum.enable();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      dispatch(
        updateAccounts({ wallet: true, accounts: accounts, account: account })
      );
      console.log("디스패치 실행됨?");
    } else {
      alert("메타마스크가 필요합니다.");
    }
  }

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

          <div>
            <span>
              <div className="mypage__user__icon">
                <Link to="/mypage">
                  <i className="ri-user-3-line"></i>
                </Link>
              </div>
            </span>
          </div>

          {wallet === false ? checkwallet() : <div>{account}</div>}
          {/* <div className="nav__right">
                        <button className="btn" onClick={() => setShowWalletModal(true)}>
                            <span>
                                <i className="ri-wallet-line"></i>
                            </span>
                            Connect Wallet
                        </button>

                        {showWalletModal && <WalletModal setShowModal={setShowWalletModal} />}

                        <span className="mobile__menu">
                            <i className="ri-menu-line" onClick={toggleMenu}></i>
                        </span>
                    </div> */}
        </div>
      </Container>
    </header>
  );
};

export default Header;

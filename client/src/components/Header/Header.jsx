import React, { useRef, useEffect } from "react";
import "./header.css";
// 로고 만들어서 아래 넣을예정
//import logo from "../../assets/images/loader.gif";
import { Container } from "reactstrap";

import { NavLink, Link } from "react-router-dom";

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
    const headerRef = useRef(null);

    const menuRef = useRef(null);

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

    const toggleMenu = () => menuRef.current.classList.toggle("active__menu");

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
                            {NAV__LINKS.map((item, index) => (
                                <li className="nav__item" key={index}>
                                    <NavLink to={item.url} className={(navClass) => (navClass.isActive ? "active" : "")}>
                                        {item.display}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="nav__right">
                        <button className="btn">
                            <span>
                                <i className="ri-wallet-line"></i>
                            </span>
                            <Link to="/wallet">Connect Wallet</Link>
                        </button>

                        <span className="mobile__menu">
                            <i className="ri-menu-line" onClick={toggleMenu}></i>
                        </span>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;

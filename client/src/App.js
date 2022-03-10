import "./App.css";
import Web3 from "web3";
import CreateNameToken from "./contracts/CreateNameToken.json";
import Bscsimpletoken from "./contracts/Bscsimpletoken.json";
import { useEffect, useState } from "react";
import Routers from "./components/routes/Routers";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { loadWeb3Account, loadWebContract } from "./redux/actions/index";

function App() {
    const dispatch = useDispatch();

    async function getWeb3() {
        // Modern dapp browsers...
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
                // Request account access if needed
                await window.ethereum.enable();
                // Accounts now exposed
                return web3;
            } catch (error) {
                console.log(error);
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            // Use Mist/MetaMask's provider.
            const web3 = window.web3;
            return web3;
        }
        // Fallback to localhost; use dev console port by default...
        else {
            const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
            const web3 = new Web3(provider);
            return web3;
        }

        // const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
        // const web3 = new Web3(provider);
        // return web3;
    }

    useEffect(async () => {
        dispatch(loadWeb3Account(await getWeb3()));
        dispatch(loadWebContract(await getWeb3()));
    }, []);

    return (
        <div>
            <Header />
            <Routers />
            <Footer />
        </div>
    );
}

export default App;

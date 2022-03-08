import "./App.css";
import Web3 from "web3";
import SimpleStorage from "./contracts/SimpleStorage.json";
import { useEffect, useState } from "react";
import Routers from "./components/routes/Routers";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const [testAccounts, setTestAccounts] = useState([]);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);

  const loadWeb3Account = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    setTestAccounts(accounts);
    if (accounts) {
      setAccount(accounts[0]);
    }
  };

  const loadWebContract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkData = SimpleStorage.networks[networkId];
    console.log(networkId);
    console.log(networkData);
    if (networkData) {
      const abi = SimpleStorage.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
      console.log(contract);
      return contract;
    }
  };

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

    // const web3 = new Web3("http://127.0.0.1:7545");
    // console.log("No web3 instance injected, using Local web3.");
    // resolve(web3);
  }

  useEffect(async () => {
    const web3 = await getWeb3();
    await loadWeb3Account(web3);
    await loadWebContract(web3);
  }, []);

  return (
    <>
      <Header />
      <div>
        <Routers />
      </div>
      <Footer />
    </>
  );
}

export default App;

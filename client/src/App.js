import "./App.css";
import { useEffect } from "react";
import Routers from "./components/routes/Routers";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useDispatch } from "react-redux";
import { connect, getWeb3 } from "./redux/actions/index";
import MetaMaskOnboarding from "@metamask/onboarding";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(connect());
    // if (MetaMaskOnboarding.isMetaMaskInstalled()) {
    //     dispatch(getWeb3());
    // }
  }, [dispatch]);
  return (
    <>
      <Header />
      <section>
        <Routers />
      </section>
      <Footer />
    </>
  );
}

export default App;

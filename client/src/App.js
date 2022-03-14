import "./App.css";
import { useEffect } from "react";
import Routers from "./components/routes/Routers";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useDispatch } from "react-redux";
import { loadWeb3Account, loadWebContract } from "./redux/actions/index";

function App() {
  const dispatch = useDispatch();

    useEffect(async () => {
        dispatch(loadWeb3Account());
        dispatch(loadWebContract());
    }, []);

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

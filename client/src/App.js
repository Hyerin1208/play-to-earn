import "./App.css";
import { useEffect } from "react";
import Routers from "./components/routes/Routers";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getWeb3, connectWallet, checkWallet } from "./redux/actions/index";

function App() {
    const dispatch = useDispatch();
    useEffect(async () => {
        dispatch(getWeb3());
    }, [dispatch]);
    const CreateNFTContract = useSelector((state) => state.AppState.CreateNFTContract);
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

import "./App.css";
import { useEffect } from "react";
import Routers from "./components/routes/Routers";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
    useEffect(async () => {}, []);

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

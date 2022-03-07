import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Main() {
    useEffect(() => {
        axios.get("/main").then(async (data) => {
            const serverMessage = await data.data.message;
            document.querySelector("#check_server").innerText = await serverMessage;
        });
    }, []);

    return (
        <div>
            <h1>Main</h1>
            <h1 id="check_server"></h1>
        </div>
    );
}

export default Main;

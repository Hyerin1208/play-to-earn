import React, { useEffect } from "react";
import "./Game.css";

function Game() {
    useEffect(() => {
        // Create script
        let script = document.createElement("script");
        script.src = `${process.env.PUBLIC_URL}/game.js`;
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <div className="score">0</div>
            <div className="stage"></div>
        </div>
    );
}

export default Game;

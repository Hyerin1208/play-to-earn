import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Footer } from "./components/Footer";
import { GameContainer } from "./components/GameContainer";
import { GameHeader } from "./components/GameHeader";
import { Guide } from "./components/Guide";
import { Popup } from "./components/Popup";
import { GlobalComponents } from "./components/styles/GlobalComponents";
import { darkTheme } from "./components/styles/Theme";
import { gameInit, updateBlock } from "./utils";

const Puzzle = () => {
  // holds the data for game logic
  const [gameData, setGameData] = useState([]);

  // checks if the user has pressed any key yet
  const [start, setStart] = useState(false);

  // track score of user
  const [userScore, setUserScore] = useState(0);

  // track user high score
  const [highScore, setHighScore] = useState();

  // show popup
  const [popup, setPopup] = useState(
    localStorage.getItem("popup") === "false" ? false : true
  );

  // hold the state of game, if no more possible moves left, set to true
  const [endGame, setEndGame] = useState(false);

  // track touch events
  const [startPos, setStartPost] = useState({});
  const [swipedTo, setSwipeTo] = useState({});

  const handleReset = () => {
    setGameData(gameInit());
    setEndGame(false);
    // update the high score in local storage
    highScore < userScore && localStorage.setItem("highScore", userScore);
    setUserScore(0);
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // if first render, then initialize the game
    gameData.length <= 0 && setGameData(gameInit());

    // get the high score from local storage
    let getHighScore = localStorage.getItem("highScore");
    getHighScore !== null
      ? setHighScore(parseInt(getHighScore))
      : setHighScore(0);

    // update the high score
    getHighScore !== null &&
      getHighScore <= userScore &&
      localStorage.setItem("highScore", userScore);

    // track the keypress to move tiles
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    setLoading(false);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [gameData, popup, userScore, endGame, startPos, swipedTo]);

  const handleTouchStart = (event) => {
    event.preventDefault();
    setStartPost({
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    });
  };
  const handleTouchMove = (event) => {
    event.preventDefault();
    setSwipeTo({
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    });
  };
  const handleTouchEnd = () => {
    if (endGame) return;

    if (startPos.x + 100 < swipedTo.x)
      updateBlock(
        gameData,
        setGameData,
        setEndGame,
        setUserScore,
        setStart,
        "right"
      );
    else if (startPos.x - 100 > swipedTo.x)
      updateBlock(
        gameData,
        setGameData,
        setEndGame,
        setUserScore,
        setStart,
        "left"
      );

    if (startPos.y + 100 < swipedTo.y)
      updateBlock(
        gameData,
        setGameData,
        setEndGame,
        setUserScore,
        setStart,
        "down"
      );
    else if (startPos.y - 100 > swipedTo.y)
      updateBlock(
        gameData,
        setGameData,
        setEndGame,
        setUserScore,
        setStart,
        "up"
      );
  };

  const handleKeyDown = (event) => {
    if (endGame) return;

    switch (event.keyCode) {
      case 37: // left || A
      case 65:
        updateBlock(
          gameData,
          setGameData,
          setEndGame,
          setUserScore,
          setStart,
          "left"
        );
        event.preventDefault();
        break;
      case 38: // up || W
      case 87:
        updateBlock(
          gameData,
          setGameData,
          setEndGame,
          setUserScore,
          setStart,
          "up"
        );
        event.preventDefault();
        break;
      case 39: // right || D
      case 68:
        updateBlock(
          gameData,
          setGameData,
          setEndGame,
          setUserScore,
          setStart,
          "right"
        );
        event.preventDefault();
        break;
      case 40: // down || S
      case 83:
        updateBlock(
          gameData,
          setGameData,
          setEndGame,
          setUserScore,
          setStart,
          "down"
        );
        event.preventDefault();
        break;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalComponents />
      <div className="App">
        {popup && <Popup setPopup={setPopup} />}
        <GameHeader
          score={userScore}
          highScore={highScore}
          handleReset={handleReset}
          setPopup={setPopup}
        />
        <GameContainer
          gameData={gameData}
          start={start}
          score={userScore}
          endGame={endGame}
          handleReset={handleReset}
        />
        <Guide />
        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  );
};

export default Puzzle;

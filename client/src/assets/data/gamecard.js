import Snake from "../images/gamePreview/snake.PNG";
import Tetris from "../images/gamePreview/TETRIS_2.PNG";
import numberGame from "../images/gamePreview/2048.png";
import Minesweeper from "../images/gamePreview/Minesweeper_2.png";

export const GAMECARD__DATA = [
  {
    id: "1",
    imgUrl: Snake,
    title: "Snake",
    text: "Move the snake around with the arrow keys, eat the red dots to grow bigger, and avoid hitting your own tail.",
  },
  {
    id: "2",
    imgUrl: Tetris,
    title: "Tetris",
    text: "Tetris became one of the most successful and recognizable video games, appearing on nearly every gaming platform available.",
  },
  {
    id: "3",
    imgUrl: numberGame,
    title: "2048",
    text: "Use your arrow keys to move the tiles. Tiles with the same number merge into one when they touch. Add them up to reach 2048!",
  },
  {
    id: "4",
    imgUrl: Minesweeper,
    title: "Minesweeper",
    text: "The objective of the game is to clear a rectangular board containing hidden or bombs without detonating any of them.",
  },
];

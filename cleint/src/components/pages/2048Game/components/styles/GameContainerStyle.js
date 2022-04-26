import styled from "styled-components";

export const GameContainerStyle = styled.div`
  background-color: #ab9d8f7d;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  margin: auto;
  width: 480px;
  height: 480px;
  padding: 5px;
  border-radius: 7px;
  position: relative;

  overflow: hidden;
`;

export const ChildStyle = styled.div`
  height: 100px;
  width: 100px;
  margin: 10px;
  font-size: 55px;
  color: #766;
  font-family: "Arial";
  background-color: #ab9d8f7d;
  border-radius: 7px;
  transition: transform 0.5s ease 1s;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100px;
    border-radius: 7px;

    position: ${({ gameStart }) => (gameStart ? "absolute" : "static")};
    top: ${({ gameStart }) => (gameStart ? "-60px" : "0")};
    left: ${({ gameStart }) => (gameStart ? "-60px" : "0")};
  }

  .tilesMerge {
    animation: ${({ tilesMerge }) => tilesMerge && `scaleTile .2s forwards`};
  }
  .scaleNewTile {
    opacity: 0;
    transform: scale(0);
    animation: ${({ newTile }) => newTile && `scaleTile .2s  .3s forwards`};
  }
  @keyframes scaleTile {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    80% {
      opacity: 1;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  .tile0 {
    background-color: #dcb;
  }
  .tile2 {
    color: black;
    background-color: #eee;
  }
  .tile4 {
    color: black;
    background-color: #eec;
  }
  .tile8 {
    color: black;
    background-color: #fb8;
  }
  .tile16 {
    color: black;
    background-color: #f96;
  }
  .tile32 {
    color: black;
    background-color: #f75;
  }
  .tile64 {
    color: black;
    background-color: #f53;
  }
  .tile128 {
    color: black;
    background-color: #ec7;
    font-size: 45px;
  }
  .tile256 {
    color: black;
    background-color: #ec6;
    font-size: 45px;
  }
  .tile512 {
    color: black;
    background-color: #ec5;
    font-size: 45px;
  }
  .tile1024 {
    color: black;
    background-color: #ec3;
    font-size: 35px;
  }
  .tile2048 {
    color: black;
    background-color: #ec2;
    font-size: 35px;
  }
`;

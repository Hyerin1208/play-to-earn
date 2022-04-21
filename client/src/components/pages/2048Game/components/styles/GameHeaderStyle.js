import styled from "styled-components";

export const GameHeaderStyle = styled.div`
 margin: auto;
 margin-top: 32px;
 width: 480px;
 color: #494545;
 margin-bottom: 28px;

 .game-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 28px;

  .title {
   margin-top: 13px;

   span {
    padding: 13px;
   }
   .tile0 {
    background-color: #dcb;
   }
   .tile2 {
    background-color: #eee;
   }
   .tile4 {
    background-color: #eec;
   }
   .tile8 {
    color: #ffe;
    background-color: #fb8;
   }
  }

  .scoreContainer {
   display: flex;

   .score {
    margin-left: 22px;
    background-color: #ab9d8f7d;
    padding: 10px 16px;
    text-align: center;
    border-radius: 6px;

    p {
     font-size: 14px;
     font-weight: 500;
    }
    h1 {
     font-size: 20px;
     margin-top: 5px;
    }
   }
  }
 }

 .buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
   font-weight: 600;
   text-decoration: underline;
   cursor: pointer;
  }
  button {
   margin: 0;
  }
 }
`;

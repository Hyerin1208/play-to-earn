import styled from "styled-components";

export const PopUpStyle = styled.div`
 background-color: rgba(1, 1, 1, 0.8);
 position: absolute;
 display: flex;
 justify-content: center;
 align-items: center;
 height: 100%;
 width: 100%;
 z-index: 500;

 .game-container {
  padding: 16px 28px;
  background-color: #eaeaea;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;

  button {
   background-color: #fb8;
   padding: 12px 32px;
   margin: 16px auto;
   font-size: 16px;
   border-radius: 5px;
   border: none;
   color: rgba(28, 28, 28, 0.9);
   cursor: pointer;

   :hover {
    background-color: rgba(255, 187, 136, 0.8);
   }
  }
 }
`;

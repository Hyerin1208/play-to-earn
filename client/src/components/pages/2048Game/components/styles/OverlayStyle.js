import styled from "styled-components";

export const OverlayStyle = styled.div`
 background-color: rgba(115, 108, 102, 0.9);
 position: absolute;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-content: center;
 width: 100%;
 height: 100%;
 opacity: 0;
 animation: fade-in 0.2s forwards;
 z-index: 100;

 @keyframes fade-in {
  to {
   opacity: 1;
  }
 }

 h1,
 p {
  padding: 16px 0;
  margin: 0 auto;
  color: white;
 }

 h1 {
  font-size: 32px;
 }

 p {
  font-weight: 600;
  font-size: 18px;

  span {
   font-weight: 700;
  }
 }
`;

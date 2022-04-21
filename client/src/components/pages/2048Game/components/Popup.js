import React from "react";
import { Guide } from "./Guide";
import { PopUpStyle } from "./styles/PopupStyle";

export const Popup = ({ setPopup }) => {
 const hidePopUp = () => {
  localStorage.setItem("popup", false);
  setPopup(false);
 };
 return (
  <PopUpStyle>
   <div className="game-container">
    <Guide />
    <button onClick={hidePopUp}>Ok, I understand</button>
   </div>
  </PopUpStyle>
 );
};

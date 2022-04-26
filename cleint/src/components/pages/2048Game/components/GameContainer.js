import { useEffect, useRef, useState } from "react";
import { ChildStyle, GameContainerStyle } from "./styles/GameContainerStyle";
import { AnimateKeyframes } from "react-simple-animate";
import { Overlay } from "./Overlay";

export const GameContainer = ({ gameData, start, endGame, score, handleReset }) => {
 // get the ref of parent element to calculate the top/left offset of each tile to later move them
 const childContainerRef = useRef(null);

 // holds the array of top/left offsets
 const [elemOffset, setElemOffset] = useState([]);
 useEffect(() => {
  let box = childContainerRef.current && childContainerRef.current.children;

  // hold the offsets of each element
  let tempArr = [];
  if (tempArr.length <= 0 && elemOffset.length <= 0) {
   for (let index = 0; index < box.length; index++) {
    tempArr.push({
     top: box[index].offsetTop,
     left: box[index].offsetLeft,
    });
   }
   setElemOffset(tempArr);
  }
 }, [childContainerRef, gameData]);

 // calculate the movement of the tile
 const getTransform = (elem) => {
  // if game hasnt started yet then dont pass the animation
  if (!start) return [];

  // initially the positions of the tiles are off the screen by 60 pixels, the 120 bring them back to their original place
  // if the tile were not off the screen, they would flicker every time the tiles moved because the location would update
  // before the tiles had time to animate
  return [
   `transform: translate(${elemOffset[elem.oldIndex]?.left + 120}px, ${elemOffset[elem.oldIndex]?.top + 120}px)`,
   `transform: translate(${elemOffset[elem.id]?.left + 120}px, ${elemOffset[elem.id]?.top + 120}px)`,
  ];
 };

 // get the classes for tiles
 // it cleans the code rather than putting it directly inline with div
 const tileDivClasses = (elem) => {
  if (elem.tilesMerge) return `childFill tile${elem.number} tilesMerge`;
  if (elem.newTile) return `childFill tile${elem.number} scaleNewTile`;
  return `childFill tile${elem.number}`;
 };

 return (
  <GameContainerStyle ref={childContainerRef}>
   {endGame && <Overlay handleReset={handleReset} score={score} />}
   {gameData.length > 0 &&
    gameData.map((elem, index) => (
     <ChildStyle key={index} elem={elem} gameStart={start} newTile={elem.newTile} tilesMerge={elem.tilesMerge}>
      {elem.tileActive && (
       <AnimateKeyframes play fillMode="forwards" easeType="ease-in" duration={0.2} keyframes={getTransform(elem)}>
        <div className={tileDivClasses(elem)}>{elem.number}</div>
       </AnimateKeyframes>
      )}
     </ChildStyle>
    ))}
  </GameContainerStyle>
 );
};

const gameInit = () => {
 const initialGameArr = [];

 // get two random boxes to start the game with
 const randNum = Math.round(Math.random());
 const initRandNum = randNum === 1 ? [5, 10] : [6, 9];

 //  const initRandNum = new Set();
 //  while (initRandNum.size < 2) {
 //   const randNum = getRandNum(0, 15);
 //  }

 // initialize the object
 for (let i = 0; i < 16; i++) {
  initialGameArr.push({
   id: i,
   tileActive: [...initRandNum].includes(i) && true, // if tile is active
   number: Math.round(Math.random()) === 0 ? 2 : 4, // number of the tiles
   oldIndex: i,
   newTile: true,
   tilesMerge: false,
  });
 }
 return initialGameArr;
};

const getRandNum = (minNum, maxNum) => {
 const min = parseInt(minNum) || 0;
 const max = parseInt(maxNum) || 30;

 return Math.floor(Math.random() * (max - min + 1)) + min;
};

const updateBlock = (gameData, setGameData, setEndGame, setUserScore, setStart, key) => {
 // keep track of user score after each move
 let userScore = 0;

 // copy of the array to mutate
 const updatedArr = [...gameData]; // output [{...}, {...}, {...}]

 // to see if anything changed, otherwise return without recalculating
 let stateChanged = false;

 // array for the ids/index of active boxes
 let activeTileID = [];

 // get the ids of active boxes
 gameData.filter((obj) => obj.tileActive === true && activeTileID.push(obj.id));

 // set newTile property of all the previous tiles to false
 for (let i = 0; i < updatedArr.length; i++) {
  updatedArr[i]["newTile"] = false;
  updatedArr[i]["tilesMerge"] = false;
 }

 // sort array descending so it loops over right/down first
 if (key === "right" || key === "down") activeTileID.sort((a, b) => b - a);

 // loop over all active boxes
 for (let i = 0; i < activeTileID.length; i++) {
  // id/index of original active element before mutation
  let id = activeTileID[i];

  // value updates / change with each while loop
  // same as id but this mutates to show updated position/index whereas id stays the same
  let value = id;

  // last index before the last iteration of the while loop
  // if going right, and elem 4 is active, this will store 3
  let lastIndex = value;

  // if two boxes are same, use it to combine them
  let sameValues = false;

  // compute the movements
  let [returnedLastIndex, returnedSameValues, returnedValue] = movementLogic(gameData, value, key, id);

  // update the values after block moves
  lastIndex = returnedLastIndex; // int
  sameValues = returnedSameValues; // bool
  value = returnedValue; // int

  // if same numbers after movement, then combine both tiles
  if (sameValues) {
   // combine the two boxes
   // adds its own value to itself to double to points
   updatedArr[value].number += updatedArr[value].number;

   // update the user score
   userScore += updatedArr[value].number;

   // mark the current/old index box false
   updatedArr[id].tileActive = false;

   // mark the new box active
   updatedArr[value].tileActive = true;

   // set the new tile for the combined tile to true to show animation
   updatedArr[value].tilesMerge = true;

   // update if array changed
   stateChanged = true;
  }
  // if it moved then updates boxes
  else if (lastIndex !== id) {
   // mark the current box false
   updatedArr[id].tileActive = false;

   // mark the new box (obj) active
   updatedArr[lastIndex].tileActive = true;

   // update the number of obj where the box has moved to the new number
   updatedArr[lastIndex].number = updatedArr[id].number;

   // reset the oldIndex of the old box
   updatedArr[id].oldIndex = id;

   // update if array changed
   stateChanged = true;
  }

  // update the index of old array
  updatedArr[lastIndex].oldIndex = id;
 }

 // if nothing changed then return without changing the state
 if (!stateChanged) return;

 // store index of new box
 let newBox = 0;
 // recursively keep getting new numbers if the random number is already taken by another active box
 (function getNewBox() {
  // update the variable with new number for active index
  newBox = getRandNum(0, 15);
  // if number taken, redo it
  if (updatedArr[newBox].tileActive === true) getNewBox();
  return;
 })();

 // make a new box after move
 updatedArr[newBox].tileActive = true;
 updatedArr[newBox].number = Math.round(Math.random()) === 0 ? 2 : 4;
 updatedArr[newBox].newTile = true;

 //update the user score state
 setUserScore((oldScore) => (oldScore += userScore));

 // if game is done
 if (gameOver(updatedArr)) setEndGame(true);

 // set the state to start the game
 setStart((oldVal) => {
  if (oldVal === false) return (oldVal = true);
  else return oldVal;
 });

 // update the state with the mutated array
 setGameData(updatedArr);
};

// compute how many boxes to move, logic of movements
const movementLogic = (gameData, value, key, id) => {
 let lastIndex = value;
 let sameValues = false;

 while (
  key === "up"
   ? value > 3
   : key === "down"
   ? value < 12
   : key === "left"
   ? value !== 0 && value !== 4 && value !== 8 && value !== 12
   : key === "right"
   ? value !== 3 && value !== 7 && value !== 11 && value !== 15
   : false
 ) {
  // how many indexes to move after each loop
  if (key === "up") value -= 4;
  if (key === "down") value += 4;
  if (key === "left") value -= 1;
  if (key === "right") value += 1;

  // empty boxes, keep looping, store index before collision
  if (gameData[value].tileActive === false) lastIndex = value;
  // if collision, check if same number to combine
  else if (gameData[value].number === gameData[id].number) {
   sameValues = true;
   break;
  } else break;

  // for left and right, check boundaries
  if (key === "left" && (value === 0 || value === 4 || value === 8 || value === 12)) break;
  if (key === "right" && (value === 3 || value === 7 || value === 11 || value === 15)) break;
 }

 // return updated array
 return [lastIndex, sameValues, value];
};

// check if the game is done
const gameOver = (gameData) => {
 // check if each box is filled
 const checkGameEnd = gameData.every((obj) => obj.tileActive === true);

 let endGame = false;

 // check bottom and right only, if right side is not match, no need to check left on the next loop since its already not the same
 // return if any of the elements have a neighbor to avoid running extra loops
 if (checkGameEnd) {
  for (let i = 0; i < 16; i++) {
   if (
    (gameData[i + 1]?.number === gameData[i]?.number || gameData[i + 4]?.number === gameData[i]?.number) &&
    i !== 3 &&
    i !== 7 &&
    i !== 11
   ) {
    endGame = false;
    break;
   } else if ((i === 3 || i === 7 || i === 11) && gameData[i + 4]?.number === gameData[i]?.number) {
    endGame = false;
    break;
   } else if (i > 11 && gameData[i + 1]?.number === gameData[i]?.number) {
    endGame = false;
    break;
   } else endGame = true;
  }
 }

 return endGame;
};

export { getRandNum, gameInit, updateBlock };

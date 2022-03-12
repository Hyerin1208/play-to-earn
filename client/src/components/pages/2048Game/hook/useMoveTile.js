import { useEffect } from "react";
import { addKeyObserver, removeKeyObserver } from "../util/keyboard";
import { makeTile, moveTile } from "../util/tile";

export default function useMoveTile({ tileList, setTileList, setScore }) {
  //움직였을 때, 항상 추가가 되니까 Add도 포함 움직인 방향을 좌표값으로 받음
  function moveAndAdd({ x, y }) {
    //ismerged라는 tile merge 된 value만 큼 score를 추가하는 logic

    const newTileList = moveTile({ tileList, x, y }); //움직여서 새로 타일을 만들어서 주는 func
    const score = newTileList.reduce(
      (acc, item) => (item.isMerged ? acc + item.value : acc),
      0
    );
    setScore((v) => v + score); //이전값 + score
    const newTile = makeTile(newTileList);
    newTile.isNew = true;
    newTileList.push(newTile);
    setTileList(newTileList);
    return tileList;
  }

  function moveUp() {
    moveAndAdd({ x: 0, y: -1 });
  }
  function moveDown() {
    moveAndAdd({ x: 0, y: 1 });
  }
  function moveLeft() {
    moveAndAdd({ x: -1, y: 0 });
  }
  function moveRight() {
    moveAndAdd({ x: 1, y: 0 });
  }

  useEffect(() => {
    addKeyObserver("up", moveUp);
    addKeyObserver("down", moveDown);
    addKeyObserver("left", moveLeft);
    addKeyObserver("right", moveRight);
    return () => {
      removeKeyObserver("up", moveUp);
      removeKeyObserver("down", moveDown);
      removeKeyObserver("left", moveLeft);
      removeKeyObserver("right", moveRight);
    };
  });
}

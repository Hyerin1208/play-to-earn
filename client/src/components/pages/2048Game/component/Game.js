import React, { useState } from "react";
import times from "lodash/times"; //times.... 뒤에 붙여줘야함
import { MAX_POS } from "../constant";
import { getInitialTileList } from "../util/tile";
import useMoveTile from "../hook/useMoveTile";
import Tile from "./Tile";

export default function Game({ setScore }) {
  //setScore 받아옴
  //#1. state 선언
  const [tileList, setTileList] = useState(getInitialTileList); //#2. title initialize

  //up down left right 키에 대한 handler 등록
  useMoveTile({ tileList, setTileList, setScore }); //hooks

  return (
    <div className="game-container">
      <div className="grid-container">
        {times(MAX_POS, (index) => (
          <div key={index} className="grid-row">
            {times(MAX_POS, (index2) => (
              <div key={index2} className="grid-cell"></div>
            ))}
          </div>
        ))}
      </div>

      <div className="tile-container">
        {tileList.map((item) => (
          <Tile key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

import React from "react";
import cn from "classnames"; //삼항연산자 대신 사용

export default function Tile({ x, y, value, isMerged, isNew }) {
  return (
    <div
      className={cn(`tile tile-${value} tile-position-${x}-${y}`, {
        "tile-merged": isMerged,
        "tile-new": isNew,
      })}
    >
      <div className="tile-inner">{value}</div>
    </div>
  );
}

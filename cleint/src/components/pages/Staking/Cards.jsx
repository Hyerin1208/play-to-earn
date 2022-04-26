import React from "react";
import Card from "./Card";
import { CARDS_DATA } from "./stake";

import "./cards.css";

const Cards = () => {
  return (
    <div className=" ">
      {CARDS_DATA.map((card, id) => {
        return (
          <div className="parent__container" key={id}>
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;

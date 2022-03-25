// 임시 nft 데이터 (DB)

import admin from "../images/avatar.png";

import freeItem1 from "../images/freeItems/free1.png";
import freeItem2 from "../images/freeItems/free2.png";
import freeItem3 from "../images/freeItems/free3.png";
import freeItem4 from "../images/freeItems/free4.png";

export const FREE__ITEMS = [
  {
    id: "1",
    title: "Naming center Item_1",
    desc: "Enhance Yourself Through The Soft Power Of Cotton, Greatly Increase Your Defense.",
    imgUrl: freeItem1,
    creator: "Naming center",
    creatorImg: admin,
    currentBid: 5.89,
    value: "Item_1",
  },

  {
    id: "2",
    title: "Naming center Item_2",
    desc: "Perform An Mystical And Powerful Dance To Increase Your Attack And Speed.",
    imgUrl: freeItem2,
    creator: "Naming center",
    creatorImg: admin,
    currentBid: 5.09,
    value: "Item_2",
  },

  {
    id: "3",
    title: "Naming center Item_3",
    desc: "Fire A Fireball At Your Opponent With A Low Probability To Burn The Target.",
    imgUrl: freeItem3,
    creator: "Naming center",
    creatorImg: admin,
    currentBid: 6.89,
    value: "Item_3",
  },

  {
    id: "4",
    title: "Naming center Item_4",
    desc: "Bash An Enemy Target Through Thunder'S Fist With Paralyzing The Target.",
    imgUrl: freeItem4,
    creator: "Naming center",
    creatorImg: admin,
    currentBid: 7.89,
    value: "Item_4",
  },
];

import { UilClipboardAlt } from "@iconscout/react-unicons";

import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";

//////////////////////////////////////////////////////////////////////////

// Analytics Cards Data
export const CARDS_DATA = [
  {
    title: "Total deposited",
    color: {
      backGround: "#343444de",
      boxShadow: "0px 4px 4px 0px #bc92ff",
    },
    barValue: 70,
    value: "00.00",
    png: UilUsdSquare,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "STAKE/AAT",
    color: {
      backGround: "#343444de",
      boxShadow: "0px 4px 4px 0px #FDC0C7",
    },
    barValue: 80,
    value: "00.00",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Total accrued emission",
    color: {
      backGround: "#343444de",
      boxShadow: "0px 4px 4px 0px #c4dcff",
    },
    barValue: 60,
    value: "00.00",
    png: UilClipboardAlt,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

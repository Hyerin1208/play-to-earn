import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { CARDS_DATA } from "./stake";
import { UilClipboardAlt } from "@iconscout/react-unicons";
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";

import "./cards.css";
import { utils } from "ethers";
import axios from "axios";
import { useSelector } from "react-redux";

const Cards = () => {
  const [stakerId, setStakerId] = useState(0);
  const [stakingAmount, setStakingAmount] = useState(0);
  const [stakers, setStakers] = useState(0);

  const [reward, setReward] = useState(0);

  const account = useSelector((state) => state.AppState.account);
  const StakingTokenContract = useSelector(
    (state) => state.AppState.StakingTokenContract
  );
  const AmusementArcadeTokenContract = useSelector(
    (state) => state.AppState.AmusementArcadeTokenContract
  );

  const check = useRef(null);

  const ITEMS = [
    {
      title: "Total deposited",
      color: {
        backGround: "#343444de",
        boxShadow: "0px 4px 4px 0px #bc92ff",
      },
      barValue: 70,
      value: stakers,
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
      value: stakingAmount,
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
      value: reward,
      png: UilClipboardAlt,
      series: [
        {
          name: "Expenses",
          data: [10, 25, 15, 30, 12, 15, 20],
        },
      ],
    },
  ];

  useEffect(async () => {
    await axios
      .post("http://127.0.0.1:5000/staking/rewards", { address: account })
      .then((res) => {
        const checkstaking = res.data.checkstaking;
        const checkuser = res.data.checkuser;
        console.log(checkuser);
        if (checkuser !== null) {
          setStakerId(checkuser.stakerId);
          setStakers(checkstaking.length);
          setStakingAmount(checkuser.amount);
        } else {
          setStakers(checkstaking.length);
        }
      });
  }, []);

  useEffect(async () => {
    if (StakingTokenContract !== null && account !== null && stakerId !== 0) {
      check.current = setInterval(async () => {
        const result = await StakingTokenContract.methods
          .userStakeInfo(account)
          .call({ from: account });
        console.log(result);
        setReward(utils.formatEther(result._availableRewards));
      }, 5000);
      return () => {
        clearInterval(check.current);
      };
    }
  }, [StakingTokenContract, stakerId]);

  return (
    <div className="parent__box">
      {ITEMS.map((card, id) => {
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

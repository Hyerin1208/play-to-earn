import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { CARDS_DATA } from "./stake";
import { UilClipboardAlt } from "@iconscout/react-unicons";
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";

import "./cards.css";
import { utils } from "ethers";
import axios from "axios";
import { useSelector } from "react-redux";

const Cards = (props) => {
  const [Loading, setLoading] = useState(false);
  const [stakerId, setStakerId] = useState(0);
  const [stakingAmount, setStakingAmount] = useState(0);
  const [stakers, setStakers] = useState(0);
  const [unclaimreward, setUnclaimreward] = useState(0);
  const [reward, setReward] = useState(0);
  const Mybalance = useSelector((state) => state.AppState.Mybalance);
  const account = useSelector((state) => state.AppState.account);
  const StakingTokenContract = useSelector(
    (state) => state.AppState.StakingTokenContract
  );
  const AmusementArcadeTokenContract = useSelector(
    (state) => state.AppState.AmusementArcadeTokenContract
  );

  const check = useRef(null);

  let RewardNum = Math.floor(reward / unclaimreward + "\n");

  const ITEMS = [
    {
      title: "Total Staker",
      color: {
        backGround: "#343444de",
        boxShadow: "0px 4px 4px 0px #bc92ff",
      },
      barValue: stakers,
      value: stakers,
      val: "명",
      png: UilClipboardAlt,
      series: [
        {
          name: "Sales",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
    },
    {
      title: "My total STAKE",
      color: {
        backGround: "#343444de",
        boxShadow: "0px 4px 4px 0px #FDC0C7",
      },
      barValue: Math.round((stakingAmount / Mybalance) * 100),
      value: stakingAmount,
      val: "AAT",
      png: UilMoneyWithdrawal,
      series: [
        {
          name: "Revenue",
          data: [10, 100, 50, 70, 80, 30, 40],
        },
      ],
    },
    {
      title: "Total Rewards",
      color: {
        backGround: "#343444de",
        boxShadow: "0px 4px 4px 0px #c4dcff",
      },
      barValue: RewardNum,
      value: RewardNum,
      val: "AAT",
      png: UilUsdSquare,
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
      .post("http://localhost:5000/staking/rewards", { address: account })
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
  function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  }
  useEffect(async () => {
    await axios
      .post("http://localhost:5000/staking/amount", {
        address: account,
      })
      .then(async (res) => {
        setStakingAmount(res.data.amount);
        if (res.data.stakerId !== null) {
          setLoading(true);
          setStakerId(res.data.stakerId);
          const result = await StakingTokenContract.methods
            .stakers(res.data.stakerId)
            .call();
          setUnclaimreward(utils.formatEther(result.unclaimedRewards));
          setLoading(false);
        }
      });
  }, []);

  useEffect(async () => {
    if (StakingTokenContract !== null && account !== null && stakerId !== 0) {
      setLoading(true);
      check.current = setInterval(async () => {
        const result = await StakingTokenContract.methods
          .userStakeInfo(account)
          .call({ from: account });
        setReward(utils.formatEther(result._availableRewards));
        setLoading(false);
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
              val={card.val}
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

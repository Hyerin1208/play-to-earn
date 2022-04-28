import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "reactstrap";

import Cards from "./Cards";

import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";

import "./staking.css";
import { useDispatch, useSelector } from "react-redux";
import { utils } from "ethers";
import axios from "axios";

import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";
import { updateMyBalance } from "../../../redux/actions";

// 아래는 임시데이터
const coins = [
  { id: 1, symbol: "STAKE", amount: 200, color: "#FDC0C7", inAAT: 1.48 },
  { id: 2, symbol: "AAT", amount: 5, color: "#c4dcff", inAAT: 37.6 },
  { id: 3, symbol: "STAKE", amount: 0.005, color: "#bc92ff", inAAT: 37363 },
];

const Staking = () => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #5900ff;
    width: 100%;
    height: 100%;
    background: #34343465;
  `;
  const timerid = useRef(null);
  const timer = useSelector((state) => state.AppState.timer);
  const account = useSelector((state) => state.AppState.account);
  const StakingTokenContract = useSelector(
    (state) => state.AppState.StakingTokenContract
  );
  const AmusementArcadeTokenContract = useSelector(
    (state) => state.AppState.AmusementArcadeTokenContract
  );

  const Mybalance = useSelector((state) => state.AppState.Mybalance);

  const [checkMyBalance, setCheckMyBalance] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [stake, setStake] = useState(null);
  const [unstake, setUnstake] = useState(null);
  const [isStop, setIsStop] = useState(false);
  const [reward, setReward] = useState(0);
  const [unclaimreward, setUnclaimreward] = useState(0);
  const [stakingAmount, setStakingAmount] = useState(0);
  const [stakerId, setStakerId] = useState(0);
  const [stakers, setStakers] = useState(0);
  const [totalStakers, setTotalStakers] = useState(0);
  const check = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Mybalance !== null) {
      setCheckMyBalance(Mybalance);
    }
  }, [Mybalance]);

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
          setStakerId(res.data.stakerId);
          // const result = await StakingTokenContract.methods
          //   .stakers(res.data.stakerId)
          //   .call();
          // setUnclaimreward(utils.formatEther(result.unclaimedRewards));
        }
      });
  }, []);

  useEffect(async () => {
    await axios
      .post("http://localhost:5000/staking/rewards", { address: account })
      .then((res) => {
        const checkstaking = res.data.checkstaking;
        const checkuser = res.data.checkuser;
        console.log(checkuser);
        if (checkuser !== null) {
          setStakerId(checkuser.stakerId);
          setStakers(checkstaking.filter((data) => data.amount !== 0).length);
          setTotalStakers(checkstaking.length);
          setStakingAmount(checkuser.amount);
        } else {
          setStakers(checkstaking.filter((data) => data.amount !== 0).length);
          setTotalStakers(checkstaking.length);
        }
      });
  }, [checkMyBalance]);

  useEffect(async () => {
    if (StakingTokenContract !== null && account !== null && stakerId !== 0) {
      setLoading(true);
      check.current = setInterval(async () => {
        const result = await StakingTokenContract.methods
          .userStakeInfo(account)
          .call({ from: account });
        setReward(utils.formatEther(result._availableRewards));
        setUnclaimreward(utils.formatEther(result._unclaimedRewards));
        setLoading(false);
      }, 5000);
      return () => {
        clearInterval(check.current);
      };
    }
  }, [StakingTokenContract, stakerId]);

  useEffect(() => {
    timerid.current = setInterval(() => {
      const countdownDate = new Date(timer).getTime();

      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (!isStop) {
        // update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
    return () => {
      clearInterval(timerid.current);
      setIsStop(true);
    };
  }, [timer]);

  const [active, setActive] = useState(null);
  const width = 240;
  const half = width / 2;

  return (
    <Container>
      {Loading ? (
        <div
          className={Loading ? "parentDisable" : ""}
          width="100%"
          height="100%"
        >
          <div className="overlay-box">
            <FadeLoader
              size={150}
              color={"#ffffff"}
              css={override}
              loading={Loading}
              z-index={"1"}
              text="Loading your content..."
            />
          </div>
        </div>
      ) : (
        false
      )}
      <Row>
        <Col sm="3">
          <main className="main__stake">
            <svg width={width} height={width}>
              <Group top={half} left={half}>
                <Pie
                  data={coins}
                  pieValue={(data) => data.amount * data.inAAT}
                  outerRadius={half}
                  innerRadius={({ data }) => {
                    const size =
                      active && active.symbol == data.symbol ? 12 : 8;
                    return half - size;
                  }}
                  padAngle={0.01}
                >
                  {(pie) => {
                    return pie.arcs.map((arc, index) => {
                      return (
                        <g
                          key={arc.data.symbol + index}
                          onMouseEnter={() => setActive(arc.data)}
                          onMouseLeave={() => setActive(null)}
                        >
                          <path d={pie.path(arc)} fill={arc.data.color}></path>
                        </g>
                      );
                    });
                  }}
                </Pie>

                {active ? (
                  <>
                    <Text
                      textAnchor="middle"
                      fill="#fff"
                      fontSize={40}
                      dy={-20}
                    >
                      {`${Math.floor(active.amount * active.inAAT)}`}
                    </Text>

                    <Text
                      textAnchor="middle"
                      fill={active.color}
                      fontSize={20}
                      dy={20}
                    >
                      {`${active.amount} ${active.symbol}`}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text
                      textAnchor="middle"
                      fill="#fff"
                      fontSize={40}
                      dy={-20}
                    >
                      {checkMyBalance}
                    </Text>

                    <Text textAnchor="middle" fill="#aaa" fontSize={20} dy={20}>
                      {`Your token balance`}
                    </Text>
                  </>
                )}
              </Group>
            </svg>
          </main>
          <div className="widget__form">
            <Cards
              setLoading={setLoading}
              checkMyBalance={checkMyBalance}
              unclaimreward={unclaimreward}
              totalreward={reward}
              stakers={stakers}
              totalStakers={totalStakers}
              stakingAmount={stakingAmount}
            />
          </div>
        </Col>
        <Col sm="8">
          <div className="stake__form">
            <h5>Time Left</h5>
            <div className="timer__container">
              <div className="timeleft__box">
                <div className="countdown-block">
                  <span className="days time-elem">
                    <span className="top">{timerDays}</span>
                    <span className="top-back">
                      <span>00</span>
                    </span>
                    <span className="bottom">{timerDays}</span>
                    <span className="bottom-back">
                      <span>00</span>
                    </span>
                  </span>
                  <span className="title">Days</span>
                </div>

                <div className="countdown-block">
                  <span className="hours time-elem">
                    <span className="top">{timerHours}</span>
                    <span className="top-back">
                      <span>00</span>
                    </span>
                    <span className="bottom">{timerHours}</span>
                    <span className="bottom-back">
                      <span>00</span>
                    </span>
                  </span>
                  <span className="title">Hours</span>
                </div>

                <div className="countdown-block">
                  <span className="minutes time-elem">
                    <span className="top">{timerMinutes}</span>
                    <span className="top-back">
                      <span>00</span>
                    </span>
                    <span className="bottom">{timerMinutes}</span>
                    <span className="bottom-back">
                      <span>00</span>
                    </span>
                  </span>
                  <span className="title">Minutes</span>
                </div>

                <div className="countdown-block">
                  <span className="seconds time-elem">
                    <span className="top">{timerSeconds}</span>
                    <span className="top-back">
                      <span>00</span>
                    </span>
                    <span className="bottom">{timerSeconds}</span>
                    <span className="bottom-back">
                      <span>00</span>
                    </span>
                  </span>
                  <span className="title">Seconds</span>
                </div>
              </div>
            </div>
            <hr />
            <div className="global__rewards">
              <h5>
                Global rewards per day <span>1%</span>
              </h5>
            </div>
            <hr />
            <div className="your__staked">
              <h5>
                Your staked <span>{stakingAmount}</span>
              </h5>
            </div>
            <hr />
            <div className="total_rewards">
              <h5>
                Your total rewards <span>{reward}</span>
              </h5>
            </div>
            <hr />
            <div className="unclaim_rewards">
              <h5>
                Your unclaim rewards <span>{unclaimreward}</span>
              </h5>
            </div>
            <hr />
            <ul>
              <li>
                <span>Available AAT balance to stake : {Mybalance}</span>
                <br />
                <input
                  type="number"
                  placeholder="AAT Price ex) MIN 500 AAT"
                  className="stake__input"
                  onChange={(e) => {
                    setStake(e.currentTarget.value);
                    console.log(stake);
                  }}
                />
                <button
                  className="stake__btn"
                  onClick={async (e) => {
                    if (StakingTokenContract !== null) {
                      setLoading(true);
                      console.log(parseInt(utils.parseUnits(stake, 18)));
                      console.log(utils.parseUnits(stake, 18));
                      await AmusementArcadeTokenContract.methods
                        .approve(
                          StakingTokenContract._address,
                          utils.parseUnits(stake, 18)
                        )
                        .send({ from: account, gas: 3000000 })
                        .then(async () => {
                          await StakingTokenContract.methods
                            .stake(utils.parseUnits(stake, 18))
                            .send({ from: account, gas: 3000000 })
                            .then(async (res) => {
                              console.log(res);
                              const stakerId =
                                res.events.addStaker.returnValues.stakerId;
                              const address =
                                res.events.addStaker.returnValues.stakerAddress;
                              const amount = parseInt(
                                utils.formatEther(
                                  res.events.addStaker.returnValues.amount
                                )
                              );
                              console.log(amount);
                              await axios
                                .post("http://localhost:5000/staking", {
                                  stakerId: stakerId,
                                  address: address,
                                  amount: amount,
                                })
                                .then((res) => {
                                  setStakingAmount(amount);
                                  dispatch(
                                    updateMyBalance({
                                      Mybalance: (
                                        parseInt(Mybalance) - stake
                                      ).toString(),
                                    })
                                  );
                                  sleep(2000);
                                  setLoading(false);
                                  alert("AAT Staking Success!");
                                  console.log(res.data.message);
                                });
                            })
                            .catch(() => {
                              setLoading(false);
                              alert(
                                "최소금액은 500 AAT 입니다.\n금액을 확인해 주세요"
                              );
                            });
                        });
                    }
                  }}
                >
                  Stake
                </button>
              </li>
              <br />
              <li>
                <span>AAT token staked : {stakingAmount}</span>
                <br />
                <input
                  type="number"
                  placeholder="Amount"
                  onChange={(e) => {
                    setUnstake(e.currentTarget.value);
                    console.log(unstake);
                  }}
                  name="number"
                  className="stake__input"
                />
                <button
                  className="stake__btn"
                  onClick={async () => {
                    console.log(utils.parseUnits(unstake, 18));
                    if (StakingTokenContract !== null) {
                      setLoading(true);
                      await StakingTokenContract.methods
                        .withdraw(utils.parseUnits(unstake, 18))
                        .send({ from: account, gas: 3000000 })
                        .then(async (res) => {
                          const stakerId =
                            res.events.withdrawAmount.returnValues.stakerId;
                          const address =
                            res.events.withdrawAmount.returnValues
                              .stakerAddress;
                          const amount = parseInt(
                            utils.formatEther(
                              res.events.withdrawAmount.returnValues.amount
                            )
                          );
                          await axios
                            .post("http://localhost:5000/staking", {
                              stakerId: stakerId,
                              address: address,
                              amount: amount,
                            })
                            .then(async (res) => {
                              const result = await StakingTokenContract.methods
                                .stakers(stakerId)
                                .call();
                              setUnclaimreward(
                                utils.formatEther(result.unclaimedRewards)
                              );
                              setStakingAmount(amount);
                              dispatch(
                                updateMyBalance({
                                  Mybalance: (
                                    parseInt(Mybalance) + parseInt(unstake)
                                  ).toString(),
                                })
                              );
                              sleep(2000);
                              setLoading(false);
                              alert("AAT Unstaking Success!");
                              console.log(res.data.message);
                            });
                        })
                        .catch(() => {
                          setLoading(false);
                          alert("스테이킹 한 금액과 다릅니다.");
                        });
                    }
                  }}
                >
                  UnStake
                </button>
              </li>
              <li>
                <br />
                <span>Pending AAT rewards : {stake}</span>
                <br />
                <button
                  className="claim__rewards"
                  onClick={async () => {
                    if (StakingTokenContract !== null) {
                      setLoading(true);
                      await StakingTokenContract.methods
                        .claimRewards()
                        .send({ from: account, gas: 3000000 })
                        .then((res) => {
                          console.log(res);
                          sleep(2000);
                          setLoading(false);
                          alert("Calim Rewards Success!");
                        })
                        .catch((err) => {
                          console.log(err);
                          setLoading(false);
                        });
                    }
                  }}
                >
                  Claim rewards
                </button>
              </li>
              {/* <li>
                <button
                  onClick={async () => {
                    if (StakingTokenContract !== null) {
                      console.log(
                        await AmusementArcadeTokenContract.methods
                          .balanceOf(StakingTokenContract._address)
                          .call()
                      );
                    }
                  }}
                >
                  TESTBUTTON
                </button>
              </li> */}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Staking;

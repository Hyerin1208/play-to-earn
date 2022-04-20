import React, { useEffect, useState, useRef } from "react";
import { Card, CardText, CardTitle, Col, Container, Row } from "reactstrap";

import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";

import "./staking.css";
import { useSelector } from "react-redux";

const Staking = () => {
  // 아래는 임시데이터
  const [coins, setCoins] = useState([
    { id: 1, symbol: "STAKE", amount: 200, color: "#ffbeff", inAAT: 1.48 },
    { id: 2, symbol: "AAT", amount: 5, color: "#c4dcff", inAAT: 37.6 },
    { id: 3, symbol: "STAKE", amount: 0.005, color: "#b080fd", inAAT: 37363 },
  ]);

  const [loading, setLoading] = useState(true);
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [isStop, setIsStop] = useState(false);
  const [defaultTime, setdefaultTime] = useState();
  const timerid = useRef(null);
  const lastDay = new Date("apr 29, 2022 18:00:00").getTime();

  useEffect(async () => {
    setdefaultTime(lastDay);
    setLoading(false);
  });

  useEffect(() => {
    timerid.current = setInterval(async () => {
      const countdownDate = defaultTime;

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
  const width = 280;
  const half = width / 2;

  return (
    <Container>
      {loading ? (
        <strong> loading... </strong>
      ) : (
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
                            key={index}
                            onMouseEnter={() => setActive(arc.data)}
                            onMouseLeave={() => setActive(null)}
                          >
                            <path
                              d={pie.path(arc)}
                              fill={arc.data.color}
                            ></path>
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
                        {`${Math.floor(
                          coins.reduce(
                            (acc, coin) => acc + coin.amount * coin.inAAT,
                            0
                          )
                        )}`}
                      </Text>

                      <Text
                        textAnchor="middle"
                        fill="#aaa"
                        fontSize={20}
                        dy={20}
                      >
                        {`Your token balance`}
                      </Text>
                    </>
                  )}
                </Group>
              </svg>
            </main>
            <form className="widget__form">
              <div className="widget__card">
                <CardTitle tag="h5" className="widget__title">
                  <i className="ri-arrow-down-line"></i>
                  Total deposited
                </CardTitle>
                <CardText className="widget__text" tag="h5">
                  0.0 STAKE
                </CardText>
              </div>
              <div className="widget__card">
                <CardTitle tag="h5" className="widget__title">
                  <i className="ri-money-dollar-circle-line"></i>
                  STAKE/AAT
                </CardTitle>
                <CardText className="widget__text" tag="h5">
                  0.0 AAT
                </CardText>
              </div>
              <div className="widget__card">
                <CardTitle tag="h5" className="widget__title">
                  <i className="ri-arrow-down-line"></i>
                  Total accrued emission
                </CardTitle>
                <CardText className="widget__text" tag="h5">
                  0.0 STAKE
                </CardText>
              </div>
            </form>
          </Col>
          <Col sm="8">
            <form className="stake__form">
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
                  Global rewards per day <span>10.000</span>
                </h5>
              </div>
              <hr />
              <div className="your__staked">
                <h5>
                  Your staked <span>10.000.000</span>
                </h5>
              </div>
              <hr />
              <div className="padding_rewards">
                <h5>
                  Your pending rewards <span>0.000.000</span>
                </h5>
              </div>
              <hr />
              <ul>
                <li>
                  <span>Available AATtoken balance to stake : </span>
                  <br />
                  <input
                    type="number"
                    placeholder="Amount"
                    // value={input}
                    name="number"
                    className="stake__input"
                  />
                  <button className="stake__btn" type="submit">
                    Stake
                  </button>
                </li>
                <br />
                <li>
                  <span>AATtoken staked : </span>
                  <br />
                  <input
                    type="number"
                    placeholder="Amount"
                    // value={input}
                    name="number"
                    className="stake__input"
                  />
                  <button className="stake__btn">UnStake</button>
                </li>
                <li>
                  <br />
                  <span>Pending AAT rewards : </span>
                  <br />
                  <button className="claim__rewards">Claim rewards</button>
                </li>
              </ul>
            </form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Staking;

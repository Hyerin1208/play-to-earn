import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

import "./admin-stk.css";

const AdminStk = () => {
  const [input, setInput] = useState("");

  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [isStop, setIsStop] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      const countdownDate = new Date("apr 29, 2022 18:00:00").getTime();

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
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      setIsStop(true);
    };
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <form className="stake__form">
            <h5>Time Left</h5>
            <div className="timer__container">
              <div className="timeleft__box">
                <div class="countdown-block">
                  <span class="days time-elem">
                    <span class="top">{timerDays}</span>
                    <span class="top-back">
                      <span>00</span>
                    </span>
                    <span class="bottom">{timerDays}</span>
                    <span class="bottom-back">
                      <span>00</span>
                    </span>
                  </span>
                  <span class="title">Days</span>
                </div>

                <div class="countdown-block">
                  <span class="hours time-elem">
                    <span class="top">{timerHours}</span>
                    <span class="top-back">
                      <span>00</span>
                    </span>
                    <span class="bottom">{timerHours}</span>
                    <span class="bottom-back">
                      <span>00</span>
                    </span>
                  </span>
                  <span class="title">Hours</span>
                </div>

                <div class="countdown-block">
                  <span class="minutes time-elem">
                    <span class="top">{timerMinutes}</span>
                    <span class="top-back">
                      <span>00</span>
                    </span>
                    <span class="bottom">{timerMinutes}</span>
                    <span class="bottom-back">
                      <span>00</span>
                    </span>
                  </span>
                  <span class="title">Minutes</span>
                </div>

                <div class="countdown-block">
                  <span class="seconds time-elem">
                    <span class="top">{timerSeconds}</span>
                    <span class="top-back">
                      <span>00</span>
                    </span>
                    <span class="bottom">{timerSeconds}</span>
                    <span class="bottom-back">
                      <span>00</span>
                    </span>
                  </span>
                  <span class="title">Seconds</span>
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
                <button className="stake__btn">Untake</button>
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
        <Col>
          <form className="admin__form">
            <h5>Admin :: Add AAT Rewards</h5>
            <hr />
            <div className="admin__input">
              <h4>Amount</h4>
              <span>Available AATtoken balance to transfer : </span>
              <br />
              <input
                type="number"
                placeholder="Amount"
                // value={input}
                name="number"
                className="stake__input"
              />
              <br />
              <br />
              <br />
              <h4>Duration (in days)</h4>
              <input
                type="number"
                placeholder="Days"
                // value={input}
                name="number"
                className="stake__input"
              />
              <br />
              <br />
              <hr />
              <br />
              <button className="Admin__rewards">Add</button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminStk;

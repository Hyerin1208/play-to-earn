import React, { useRef, useState, useEffect } from "react";

import "./airdrop.css";

const AirDrop = () => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date("apr 15, 2022 00:00:00").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        // stop our timer
        clearInterval(interval.current);
      } else {
        // update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  // componentDidMount
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  return (
    <>
      <div className="content-wrapper">
        <h1 className="drop__title">작명소NFT Drop Coming Soon!!</h1>
        <p className="drop__nft" id="new-nft">
          A new batch of 작명소 nft will be available very soon!
        </p>
        <div className="timer">
          <div className="timer-box">
            <div className="timer-box__count">
              <span id="days">{timerDays}</span>
            </div>
            <div className="timer-box__text">Days</div>
          </div>
          <div className="timer-box">
            <div className="timer-box__count">
              <span id="hours">{timerHours}</span>
            </div>
            <div className="timer-box__text">Hours</div>
          </div>
          <div className="timer-box">
            <div className="timer-box__count">
              <span id="minutes">{timerMinutes}</span>
            </div>
            <div className="timer-box__text">Minutes</div>
          </div>
          <div className="timer-box">
            <div className="timer-box__count">
              <span id="seconds">{timerSeconds}</span>
            </div>
            <div className="timer-box__text">Seconds</div>
          </div>
        </div>
      </div>

      <div className="fireworks-container"></div>
    </>
  );
};

export default AirDrop;

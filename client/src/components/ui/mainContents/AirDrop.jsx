import React, { useRef, useState, useEffect } from "react";

import "./airdrop.css";

const AirDrop = () => {
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
  }, []);

  useEffect(() => {
    timerid.current = setInterval(() => {
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
  }, [defaultTime]);

  return (
    <>
      {loading ? (
        <strong> loading... </strong>
      ) : (
        <div className="content-wrapper">
          <h1 className="drop__title">Naming Center NFT Drop Coming Soon!!</h1>
          <p className="drop__nft" id="new-nft">
            A new batch of Naming Center nft will be available very soon!
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
      )}

      <div className="fireworks-container"></div>
    </>
  );
};

export default AirDrop;

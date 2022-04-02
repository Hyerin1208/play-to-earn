import React, { Fragment } from "react";
import { Container } from "reactstrap";

import "./ranking.css";

const Clock = ({ timerDays, timerHours, timerMinutes, timerSeconds }) => {
  return (
    <Fragment>
      <div className="timer-container">
        <div className="timer">
          <div className="clock">
            <Container>
              <p>{timerDays}</p>
              <small>Days</small>
            </Container>
            <span>:</span>
            <Container>
              <p>{timerHours}</p>
              <small>Hours</small>
            </Container>
            <span>:</span>
            <Container>
              <p>{timerMinutes}</p>
              <small>Minute</small>
            </Container>
            <span>:</span>
            <Container>
              <p>{timerSeconds}</p>
              <small>Seconds</small>
            </Container>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Clock.defaultProps = {
  timerDays: 10,
  timerHours: 10,
  timerMinutes: 10,
  timerSeconds: 10,
};

export default Clock;

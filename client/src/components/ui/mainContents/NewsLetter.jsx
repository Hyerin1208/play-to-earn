import React, { useState } from "react";
import { CardTitle, Input } from "reactstrap";
import {
  animated,
  useSpring,
  config,
  useSpringRef,
  useChain,
} from "react-spring";

import "./newsletter.css";

const NewsLetter = () => {
  const [isChecked, setIsChecked] = useState(false);
  const checkboxAnimationRef = useSpringRef();
  const checkboxAnimationStyle = useSpring({
    backgroundColor: isChecked ? "#808" : "#fff",
    borderColor: isChecked ? "#808" : "#ddd",
    config: config.gentle,
    ref: checkboxAnimationRef,
  });

  const [checkmarkLength, setCheckmarkLength] = useState(null);

  const checkmarkAnimationRef = useSpringRef();
  const checkmarkAnimationStyle = useSpring({
    x: isChecked ? 0 : checkmarkLength,
    config: config.gentle,
    ref: checkmarkAnimationRef,
  });

  useChain(
    isChecked
      ? [checkboxAnimationRef, checkmarkAnimationRef]
      : [checkmarkAnimationRef, checkboxAnimationRef],
    [0, 0.1]
  );

  return (
    <div className="subscribe__box">
      <h2>Never miss a drop</h2>
      <p className="drop__subtitle">
        Subscribe for the latest news, drop & callection.
      </p>
      <div className="newinput__box">
        <input
          className="newletter__input"
          type="email"
          placeholder="Your email address"
          list="defaultEmails"
        />
        <button className="subscribe__btn">Subscribe</button>
      </div>

      <label>
        <input
          className="news__checkbox"
          type="checkbox"
          onChange={() => {
            setIsChecked(!isChecked);
          }}
        />
        <animated.svg
          style={checkboxAnimationStyle}
          className={`checked__box ${isChecked ? "checked__box--active" : ""}`}
          // This element is purely decorative so
          // we hide it for screen readers
          aria-hidden="true"
          viewBox="0 0 15 11"
          fill="none"
        >
          <animated.path
            d="M1 4.5L5 9L14 1"
            strokeWidth="2"
            stroke="#fff"
            ref={(ref) => {
              if (ref) {
                setCheckmarkLength(ref.getTotalLength());
              }
            }}
            strokeDasharray={checkmarkLength}
            strokeDashoffset={checkmarkAnimationStyle.x}
          />
        </animated.svg>
        {/* <input type="checkbox" id="NewsSub" /> */}
        {/* <label htmlFor="NewsSub"> */}
        &nbsp;&nbsp;&nbsp;Join our mailing list to stay in the loop with our
        newest feature releases, NFT drops, and tips and tricks for navigating
        OpenSea.
        {/* </label> */}
      </label>
    </div>
  );
};

export default NewsLetter;

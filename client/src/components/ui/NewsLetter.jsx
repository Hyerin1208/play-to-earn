import React from "react";
import { CardTitle, Input } from "reactstrap";

import "./newsletter.css";

const NewsLetter = () => {
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
      <div className="check__box">
        <input type="checkbox" id="NewsSub" />
        <label htmlFor="NewsSub">
          Join our mailing list to stay in the loop with our newest feature
          releases, NFT drops, and tips and tricks for navigating OpenSea.
        </label>
      </div>
    </div>
  );
};

export default NewsLetter;

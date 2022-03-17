import React from "react";

import "./compensation.css";

const Compensation = ({ setShowModal }) => {
  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h2 className="text-center text-light">Weekly Bonus</h2>
        <div className="reward__content glow">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus ex id saepe voluptatem, quam dolorem itaque illum
            omnis ut corrupti, porro minus. Qui repellendus corrupti inventore
            provident, consectetur eveniet labore.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Compensation;

import React from "react";
import { NavLink } from "react-router-dom";

const StepIndicator = () => {
  const steps = [
    {
      path: "/join/step1",
    },
    {
      path: "/join/step2",
    },
    {
      path: "/join/step3",
    },
    {
      path: "/join/step4",
    },
  ];

  const handleStop = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="stepIndicator">
        {steps.map((step, index) => {
          return (
            <div key={index} className="step__list">
              <NavLink
                key={index}
                onClick={handleStop}
                className={(step) => (step.isActive ? "activeLink" : "none")}
                to={step.path}
              >
                {index + 1}
              </NavLink>
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StepIndicator;

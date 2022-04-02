import React from "react";
import { NavLink } from "reactstrap";

const Error404 = () => {
  return (
    <>
      <div className="not__found" style={{ margin: "80px 0px 40px 100px" }}>
        <div className="notfound__box">
          <div className="notfound-404">
            <h1>404</h1>
          </div>
          <h2>WE ARE SORRY, PAGE NOT FOUND !</h2>
          <p>
            The page are looking for might have been removed had its name
            changed or is temporarily unvailable.
          </p>
          <NavLink href="/">back to homepage</NavLink>
        </div>
      </div>
    </>
  );
};

export default Error404;

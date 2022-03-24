import React, { Fragment } from "react";
import { Link, Route, Routes } from "react-router-dom";
import StepIndicator from "./StepIndicator";

import FreeItem from "./FreeItem";
import BuyToken from "./BuyToken";
import CreateAccount from "./CreateAccount";
import SetUp from "./Setup";

import "./join-us.css";
import { Container } from "reactstrap";

const JoinUs = () => {
  return (
    <Fragment>
      <Container>
        <div className="signup">
          <div className="join__Container">
            <StepIndicator />
            <div className="join__output">
              <Routes>
                <Route exact path="/" element={<FreeItem />}></Route>
                <Route exact path="/step2" element={<BuyToken />}></Route>
                <Route exact path="/step3" element={<CreateAccount />}></Route>
                <Route exact path="/step4" element={<SetUp />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default JoinUs;

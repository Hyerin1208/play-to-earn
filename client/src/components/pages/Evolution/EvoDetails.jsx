import React from "react";
import styled from "styled-components";

import { Marginer } from "./Marginer";

const DetailsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2.5em 6px 0 6px;
  line-height: 1.4;
`;

const MediumText = styled.span`
  font-size: 18px;
  color: #fff;
  font-weight: 800;
  text-transform: uppercase;
`;
const SmallText = styled.span`
  font-size: 11px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
`;

const SpaceHorizontalContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EvoButton = styled.button`
  padding: 10px 16px;
  background-color: #4b50e6;
  color: #000;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 700;
  border: 3px solid transparent;
  outline: none;
  cursor: pointer;
  transition: all 290ms ease-in-out;
  border-radius: 8px;

  &:hover {
    background-color: transparent;
    color: #fff;
    border: 3px solid #4b50e6;
  }
`;

const EvoDetails = (props) => {
  return (
    <DetailsContainer>
      <SmallText>Evolution ?</SmallText>
      <SpaceHorizontalContainer>
        <MediumText>Choose the nft that needs to be evolution</MediumText>
      </SpaceHorizontalContainer>
      <Marginer direction="vertical" margin="1.2em" />
      <SpaceHorizontalContainer>
        <MediumText>YOUR NEXT PROFILE</MediumText>
        <EvoButton>Evolution</EvoButton>
      </SpaceHorizontalContainer>
    </DetailsContainer>
  );
};

export default EvoDetails;

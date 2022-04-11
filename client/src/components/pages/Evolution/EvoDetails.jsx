import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Marginer } from "./Marginer";

import NaimingLogo from "../../../assets/images/naminglogo.png";
import { useDispatch, useSelector } from "react-redux";
import { updateMyLists } from "../../../redux/actions/index";
import axios from "axios";

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
  padding: 8px 10px;
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
  margin-left: 4px;
  text-shadow: 0 0 0.125em hsl(0, 0%, 98.0392156862745%);

  &:hover {
    background-color: transparent;
    color: #fff;
    border: 3px solid #4b50e6;
  }
`;

const OurLogo = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: auto;
    height: 13px;
  }
`;

const EvoDetails = (props) => {
  const [autoChange, setAutoChange] = useState(false);
  const [changeCard, setChangeCard] = useState(false);
  const [tokenId, setTokenId] = useState(null);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );
  const account = useSelector((state) => state.AppState.account);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <DetailsContainer>
      <SmallText>Evolution ?</SmallText>
      <SpaceHorizontalContainer>
        <MediumText>Choose the nft that needs to be evolution</MediumText>
      </SpaceHorizontalContainer>
      {/* <OurLogo>
        <img src={NaimingLogo} alt="" />
      </OurLogo> */}
      <Marginer direction="vertical" margin="1.2em" />
      <SpaceHorizontalContainer>
        <SmallText>YOUR NEXT PROFILE</SmallText>
        <EvoButton
          onClick={async () => {
            if (CreateNFTContract !== null) {
              await CreateNFTContract.methods
                .changeOption(parseInt(props.data.NFTId), account)
                .send({ from: account, gas: 3000000 })
                .then(async () => {
                  const MyNFTlists = await CreateNFTContract.methods
                    .MyNFTlists()
                    .call({ from: account });

                  const listsForm = await Promise.all(
                    MyNFTlists.map(async (i) => {
                      const tokenURI = await CreateNFTContract.methods
                        .tokenURI(i.tokenId)
                        .call();
                      const meta = await axios
                        .get(tokenURI)
                        .then((res) => res.data);
                      let item = {
                        fileUrl: await meta.image,
                        formInput: {
                          tokenid: i.tokenId,
                          price: i.price,
                          rare: i.rare,
                          star: i.star,
                          name: await meta.name,
                          description: await meta.description,
                        },
                      };
                      return item;
                    })
                  );
                  props.data.setAfterEvo(listsForm[props.data.NFTIndex]);
                  dispatch(updateMyLists(await listsForm));
                });
            }
          }}
        >
          Evolution
        </EvoButton>
      </SpaceHorizontalContainer>
    </DetailsContainer>
  );
};

export default EvoDetails;

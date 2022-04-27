import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Marginer } from "./Marginer";

import { useDispatch, useSelector } from "react-redux";
import { updateMyLists, updateSellLists } from "../../../redux/actions/index";
import axios from "axios";
import { utils } from "ethers";

import "./evo-details.css";
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";

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
  @media only screen and (max-width: 1024px) {
    width: 80%;
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
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );
  const account = useSelector((state) => state.AppState.account);
  const networkid = useSelector((state) => state.AppState.networkid);
  const chainid = useSelector((state) => state.AppState.chainid);
  const AmusementArcadeTokenContract = useSelector(
    (state) => state.AppState.AmusementArcadeTokenContract
  );
  const UtilsContract = useSelector((state) => state.AppState.UtilsContract);
  const dispatch = useDispatch();
  const [isEvo, setIsEvo] = useState(false);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #5900ff;
    width: 100%;
    height: 100%;
    background: #34343465;
  `;
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    return async () => {
      if (isEvo) {
        setLoading(true);
        const lists = await CreateNFTContract.methods.Selllists().call();

        const listsForm = await Promise.all(
          lists.map(async (i) => {
            const tokenURI = await CreateNFTContract.methods
              .tokenURI(i.tokenId)
              .call();

            const meta = await axios.get(tokenURI).then((res) => res.data);
            let item = {
              fileUrl: await meta.image,
              formInput: {
                tokenid: i.tokenId,
                price: utils.formatEther(i.price),
                star: i.star,
                rare: i.rare,
                sell: i.sell,
                name: await meta.name,
                description: await meta.description,
              },
            };
            return item;
          })
        );
        dispatch(
          updateSellLists({
            Selllists: listsForm,
          })
        );
      }
      setLoading(false);
    };
  }, [isEvo]);

  // if (Loading) {
  //   return (
  //     <div className={Loading ? "parentDisable" : ""} width="100%">
  //       <div className="overlay-box">
  //         <FadeLoader
  //           size={150}
  //           color={"#ffffff"}
  //           css={override}
  //           loading={Loading}
  //           z-index={"1"}
  //           text="Loading your content..."
  //         />
  //       </div>
  //     </div>
  //   );
  // } else {
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
              if (
                chainid === 1337 ? false : networkid === chainid ? false : true
              )
                return alert("네트워크 아이디를 확인하세요");
              const cost = 50;
              props.setLoading(true);
              await AmusementArcadeTokenContract.methods
                .approve(
                  UtilsContract.options.address,
                  utils.parseEther(cost.toString())
                )
                .send({ from: account, gas: 3000000 })
                .then(async (res) => {
                  await UtilsContract.methods
                    .ChangOption(
                      parseInt(props.data.NFTId),
                      utils.parseEther(cost.toString())
                    )
                    .send(
                      {
                        from: account,
                        gas: 3000000,
                      },
                      (error) => {
                        if (!error) {
                          console.log("send ok");
                        } else {
                          setLoading(false);
                          console.log(error);
                        }
                      }
                    )
                    .then(async (res) => {
                      const tokenId = props.data.NFTId;
                      const rare = res.events.EvoResult.returnValues.rare;
                      const star = res.events.EvoResult.returnValues.star;
                      await axios
                        .post(`http://15.165.17.43:5000/nfts/upgrade`, {
                          tokenId: tokenId,
                          rare: rare,
                          star: star,
                        })
                        .then((res) => {
                          setLoading(false);
                          console.log(res.data.message);
                        });
                    });
                });

              // await CreateNFTContract.methods
              //   .changeOption(parseInt(props.data.NFTId), account)
              //   .send({ from: account, gas: 3000000 })
              //   .then(async () => {
              //     const MyNFTlists = await CreateNFTContract.methods
              //       .MyNFTlists()
              //       .call({ from: account });

              //     const listsForm = await Promise.all(
              //       MyNFTlists.map(async (i) => {
              //         const tokenURI = await CreateNFTContract.methods
              //           .tokenURI(i.tokenId)
              //           .call();
              //         const meta = await axios
              //           .get(tokenURI)
              //           .then((res) => res.data);
              //         let item = {
              //           fileUrl: await meta.image,
              //           formInput: {
              //             tokenid: i.tokenId,
              //             price: utils.formatEther(i.price),
              //             rare: i.rare,
              //             star: i.star,
              //             sell: i.sell,
              //             name: await meta.name,
              //             description: await meta.description,
              //           },
              //         };
              //         return item;
              //       })
              //     );
              //     props.data.setAfterEvo(listsForm[props.data.NFTIndex]);

              // axios
              //   .post(`http://15.165.17.43:5000/nfts/upgrade`, {
              //     tokenId: listsForm[props.data.NFTIndex].formInput.tokenid,
              //     rare: listsForm[props.data.NFTIndex].formInput.rare,
              //     star: listsForm[props.data.NFTIndex].formInput.star,
              //   })
              //   .then((res) => {
              //     console.log(res.data.message);
              //   });
              //     dispatch(updateMyLists({ MyNFTlists: await listsForm }));
              //     setIsEvo(true);
              //   });
            }
          }}
        >
          Evolution
        </EvoButton>
      </SpaceHorizontalContainer>
    </DetailsContainer>
  );
  // }
};

export default EvoDetails;

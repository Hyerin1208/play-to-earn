import React, { useEffect, useState } from "react";
import SideBar from "../../ui/dashboard/SideBar";
import MainContent from "../../ui/dashboard/MainContent";
import { Container } from "reactstrap";
import { updateMyLists } from "../../../redux/actions";
import axios from "axios";
import { utils } from "ethers";
import { useDispatch, useSelector } from "react-redux";

const MyDash = () => {
  const dispatch = useDispatch();
  const MyNFTlists = useSelector((state) => state.AppState.MyNFTlists);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );
  const account = useSelector((state) => state.AppState.account);

  useEffect(async () => {
    if (CreateNFTContract !== null && MyNFTlists.length !== 0) {
      const loadMyNFTlists = await CreateNFTContract.methods
        .MyNFTlists()
        .call({ from: account });
      const listsForm = await Promise.all(
        loadMyNFTlists.map(async (i) => {
          const tokenURI = await CreateNFTContract.methods
            .tokenURI(i.tokenId)
            .call();
          const meta = await axios.get(tokenURI).then((res) => res.data);
          let item = {
            fileUrl: await meta.image,
            formInput: {
              tokenid: i.tokenId,
              price: utils.formatEther(i.price),
              rare: i.rare,
              star: i.star,
              sell: i.sell,
              name: await meta.name,
              description: await meta.description,
            },
          };
          return item;
        })
      );
      dispatch(updateMyLists({ MyNFTlists: listsForm }));
    }
  }, [CreateNFTContract]);

  return (
    <Container
      style={{
        display: "flex",
        height: " 120vh",
        background: "linear-gradient(to bottom right, white 0%, # e6e4ff 70%)",
        borderRadius: "2rem",
        marginBottom: "480px",
      }}
    >
      <SideBar />
      <MainContent />
    </Container>
  );
};

export default MyDash;

import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import CommonSection from "../ui/CommonSection";
import NftCard from "../ui/NftCard";

import { Container, Row, Col } from "reactstrap";
import { NFT__DATA } from "../../assets/data/data";

import "./market.css";
import { useSelector } from "react-redux";

import axios from "axios";

const Market = ({ navigation }) => {
  const [nftListBox, setnftListBox] = useState([]);
  const nftArray = [...nftListBox].reverse();
  const [loadingState, setLoadingState] = useState("not-loaded");

  const [fileUrl, setFileUrl] = useState("");
  const [NFTimage, setNFTimage] = useState("");
  const [NFTname, setNFTname] = useState("");
  const [NFTdesc, setNFTdesc] = useState("");

  const [data, setData] = useState(NFT__DATA);

  const Account = useSelector((state) => state.AppState.account);
  const CreateNFTContract = useSelector(
    (state) => state.AppState.CreateNFTContract
  );

  const AmusementArcadeTokenContract = useSelector(
    (state) => state.AppState.AmusementArcadeTokenContract
  );

  const handleCategory = () => {};

  const handleItems = () => {};

  const [form, setForm] = useState({
    fileUrl: fileUrl,
    formInput: {
      id: "",
      price: "",
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    ownerselllists();
  }, []);

  //오너 nft 판매 리스트
  async function ownerselllists() {
    const lists = await CreateNFTContract.methods
      .OwnerSelllists()
      .call({ from: Account }, (error) => {
        if (!error) {
          console.log("send ok");
        } else {
          console.log(error);
        }
      });
    const result = await Promise.all(
      lists.map(async (i) => {
        const tokenURI = await CreateNFTContract.methods
          .tokenURI(i.tokenId)
          .call({ from: Account });
        const meta = await axios.get(tokenURI).then((res) => res.data);
        let item = {
          fileUrl: await meta.image,
          formInput: {
            id: await i.tokenId,
            price: await meta.price,
            name: await meta.name,
            description: await meta.description,
          },
        };
        return item;
      })
    );
    console.log(result);
    setnftListBox(result);
    setLoadingState("loaded");
  }

  //nft 구매
  async function buynft(tokenId, price) {
    await CreateNFTContract.methods
      .getNFTItem(tokenId)
      .send({ from: Account, gas: 3000000, value: price }, (error) => {
        if (!error) {
          console.log("send ok");
        } else {
          console.log(error);
        }
      });
  }

  //nft 판매
  async function sellnft(tokenId, price) {
    await CreateNFTContract.methods
      .sellMyNFTItem(tokenId, price)
      .send({ from: Account, gas: 3000000 }, (error) => {
        if (!error) {
          console.log("send ok");
        } else {
          console.log(error);
        }
      });
  }

  //URI 확인
  async function gettokenuri(tokenId) {
    const tokenURI = await CreateNFTContract.methods
      .tokenURI(tokenId)
      .call({ from: Account }, (error) => {
        if (!error) {
          console.log("send ok");
        } else {
          console.log(error);
        }
      });
    await axios.get(tokenURI).then(async (data) => {
      setNFTname(data.data.name);
      setNFTdesc(data.data.description);
      setNFTimage(data.data.image);
      setForm({
        fileUrl: data.data.image,
        formInput: {
          price: "",
          name: data.data.name,
          description: data.data.description,
        },
      });
    });
    // const result = await axios.get(tokenURI).then((data) => data.data);
  }

  // ============ 데이터 정렬 (High,MID,LOW Late) ==================
  const handleSort = (e) => {
    const filterValue = e.target.value;

    if (filterValue === "high") {
      const filterData = NFT__DATA.filter((item) => item.currentBid >= 6);

      setData(filterData);
    }

    if (filterValue === "mid") {
      const filterData = NFT__DATA.filter(
        (item) => item.currentBid >= 5.5 && item.currentBid < 6
      );

      setData(filterData);
    }

    if (filterValue === "low") {
      const filterData = NFT__DATA.filter(
        (item) => item.currentBid >= 4.89 && item.currentBid < 5.5
      );

      setData(filterData);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <CommonSection title={"Market Place"} />

      <div className="market__box">
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="market__product__filter">
                <div className="filter__left">
                  <div className="all__category__filter">
                    <select onChange={handleCategory}>
                      <option>All Categories</option>
                      <option value="Art">Art</option>
                      <option value="badge">Badge</option>
                      <option value="Item">Item</option>
                      <option value="domain-name">Domain Name</option>
                      <option value="Trading Card">Trading Card</option>
                    </select>
                  </div>
                  <div className="all__items__filter">
                    <select onChange={handleItems}>
                      <option value="">All Items</option>
                      <option value="single-item">Single Item</option>
                      <option value="bundle">Bundle</option>
                    </select>
                  </div>
                </div>

                <div className="filter__right">
                  <select onChange={handleSort}>
                    <option>Sort By</option>
                    <option value="high">High Rate</option>
                    <option value="mid">Mid Rate</option>
                    <option value="low">Low Rate</option>
                  </select>
                </div>
              </div>
            </Col>
            <button
              onClick={() => {
                ownerselllists();
                console.log(nftListBox);
              }}
            >
              show
            </button>

            {nftArray.slice(0, 12).map((items, index) => (
              <Col className="mb-4" lg="3" md="4" sm="6" key={index}>
                <NftCard
                  item={items}
                  id={items.formInput.tokenid}
                  onClick={async (e) => {
                    let tokenid = e.target.getAttribute("id");
                    await CreateNFTContract.methods.tokenURI(tokenid).call({
                      from: "0xC7E1F2dca144AEDA8ADF4f9093da9aAC18ce7436",
                    });
                  }}
                  // onClick={() => navigate(`${items.formInput.tokenid}`)}
                  // onPress={() =>
                  //   navigation.navigate("Details", {
                  //     tokenid: items.formInput.tokenid,
                  //   })
                  // }
                ></NftCard>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Market;

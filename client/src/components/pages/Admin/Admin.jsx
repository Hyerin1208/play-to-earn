import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { utils } from "ethers";

import AdminInfo from "./AdminInfo";
import Accept from "./Accept";
import OwnerSellList from "./OwnerSellList";

import "./admin.css";
import { setTimer } from "../../../redux/actions/index";

import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";

const Admin = () => {
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState("/404-not-found");

  const account = useSelector((state) => state.AppState.account);
  const networkid = useSelector((state) => state.AppState.networkid);
  const chainid = useSelector((state) => state.AppState.chainid);
  const AmusementArcadeTokenContract = useSelector(
    (state) => state.AppState.AmusementArcadeTokenContract
  );
  const TokenClaimContract = useSelector(
    (state) => state.AppState.TokenClaimContract
  );
  const StakingTokenContract = useSelector(
    (state) => state.AppState.StakingTokenContract
  );

  const [rankingDB, setRankingDB] = useState(null);
  const dispatch = useDispatch();
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #5900ff;
    width: 100%;
    height: 100%;
    background: #34343465;
  `;
  function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  }
  useEffect(() => {
    if (account !== null) {
      axios
        .post(`http://localhost:5000/game/ranking`, { address: account })
        .then((response) => {
          const data = response.data;
          setRankingDB(data);
        })
        .catch((error) => {
          setError(error);
          window.location.href = "/error";
        });
    }
  }, [account]);

  const testfunc = async () => {
    await axios
      .post("http://localhost:5000/staking/rewards", { address: account })
      .then(async (res) => {
        const userarry = res.data.checkstaking;
        if (userarry.length > 0) {
          alert("스테이킹 한사람이 있네요");
          const reault = await userarry.map((data) => parseInt(data.stakerId));
          console.log(reault);
          setLoading(true);
          await StakingTokenContract.methods
            .resettimer(reault)
            .send({ from: account, gas: 3000000 })
            .then(async (res) => {
              console.log(res);
              console.log(res.events.totalunclaimedRewards.returnValues.amount);
              const sendrewards =
                res.events.totalunclaimedRewards.returnValues.amount;

              const stakingAddress = await StakingTokenContract.options.address;
              console.log(utils.formatUnits(sendrewards, "wei"));
              await AmusementArcadeTokenContract.methods
                .transfer(stakingAddress, utils.formatUnits(sendrewards, "wei"))
                .send({ from: account, gas: 3000000 })
                .then((res) => {
                  sleep(2000);
                  setLoading(false);
                  console.log(res);
                  console.log("전송완료");
                });
            });
        } else {
          setLoading(false);
          alert("스테이킹 한사람이 없어요~~~~");
        }
      });
  };

  const sendRank = async () => {
    if (chainid === 1337 ? false : networkid === chainid ? false : true)
      return alert("네트워크 아이디를 확인하세요");
    const arry = ["mineranker", "snakeranker", "puzzleranker", "tetrisranker"];
    let temp = [];
    for (let i = 0; i < arry.length; i++) {
      if (rankingDB[arry[i]].length !== 0) {
        for (let k = 0; k < rankingDB[arry[i]].length; k++) {
          temp.push(rankingDB[arry[i]][k].address);
        }
      }
    }
    await axios
      .post(`http://localhost:5000/ranking`, {
        rankingDB: rankingDB,
        address: temp,
        owner: account,
      })
      .then(async (res) => {
        if (res.data.message === "ok") {
          const arry = await res.data.totalclaim;
          const timer = await res.data.count;
          const result = arry.reduce((sum, element) => {
            return sum + element.balance;
          }, 0);
          const contractbalance = await TokenClaimContract.methods
            .contractbalance()
            .call();
          const sendamount =
            parseFloat(result) - parseFloat(utils.formatEther(contractbalance));
          const claimAddress = await TokenClaimContract.options.address;

          setLoading(true);
          await AmusementArcadeTokenContract.methods
            .transfer(claimAddress, utils.parseEther(sendamount.toString()))
            .send({ from: account, gas: 3000000 })
            .then(() => {
              dispatch(setTimer({ timer: parseInt(timer) }));
              alert("DB 전송 완료");
              setLoading(false);
              window.location.reload();
            });
        } else {
          setLoading(false);
          alert("아직 미승인된 유저가 있습니다.");
        }
      });
  };

  return (
    <React.Fragment>
      {Loading ? (
        <div
          className={Loading ? "parentDisable" : ""}
          width="100%"
          height="100%"
        >
          <div className="overlay-box">
            <FadeLoader
              size={150}
              color={"#ffffff"}
              css={override}
              loading={Loading}
              z-index={"1"}
              text="Loading your content..."
            />
          </div>
        </div>
      ) : (
        false
      )}
      <Container
        style={{
          display: "flex",
          height: " 120vh",
          background:
            "linear-gradient(to bottom right, white 0%, # e6e4ff 70%)",
          borderRadius: "2rem",
          marginBottom: "10px",
        }}
      >
        <div className="admin__dash">
          <div className="sub__container2">
            <div className="section1__one">
              <Col xs="4">
                <AdminInfo />
                <div className="btn__admin">
                  <button
                    className="sendRank__btn"
                    type="button"
                    // onClick={() => testfunc()}
                    onClick={() => sendRank()}
                  >
                    Send Ranking
                  </button>
                  <button className="staking__btn" onClick={() => testfunc()}>
                    <i className="ri-shield-keyhole-line"></i>
                    AAT Staking
                    {/* <Link to={"/aatadmin"}>&nbsp;AAT Staking</Link> */}
                  </button>
                </div>
              </Col>
              <Col xs="8">
                <Accept setLoading={setLoading} />
              </Col>
            </div>
            <Row>
              <div className="section2__two">
                <Col>
                  <h5>Naming Center's All Nfts</h5>
                  <OwnerSellList setLoading={setLoading} />
                </Col>
              </div>
            </Row>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Admin;

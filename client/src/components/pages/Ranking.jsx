import { useEffect, useState } from "react";
import { Col, Container } from "reactstrap";
import CommonSection from "../ui/CommonSection";
import "./ranking.css";
import axios from "axios";

const Ranking = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log("ddd");
    axios
      .get(`http://localhost:5000/snake`)
      .then((response) => {
        console.log(response);
        console.log(response.data[0].address);
        console.log(response.data[1].address);
        setResult(response.data);
        console.log("ggg");
      })
      .catch((error) => {
        setError(error);
      });
    setLoading(false);
  }, []);

  return (
    <>
      <CommonSection title="Ranking" />
      <div className="Ranking__container">
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            종합랭킹
          </button>
          <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            주간랭킹
          </button>
          <button
            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            MY랭킹
          </button>
        </div>

        <div className="content-tabs">
          <div
            className={
              toggleState === 1 ? "content  active-content" : "content"
            }
          >
            <h2>종합랭킹</h2>
            <hr />
            <Container>
              <div className="ranking__box">
                여기에 종합랭킹 순위표만들기
                <br />
                <br />
                <p>1st {result[0].address}</p>
                <p>2nd {result[1].address}</p>
              </div>
            </Container>
          </div>

          <div
            className={
              toggleState === 2 ? "content  active-content" : "content"
            }
          >
            <h2>주간랭킹</h2>
            <hr />
            <Container>
              <div className="ranking__box">여기에 주간랭킹 순위표만들기</div>
            </Container>
          </div>

          <div
            className={
              toggleState === 3 ? "content  active-content" : "content"
            }
          >
            <h2>나의랭킹</h2>
            <hr />
            <Container>
              <p>여기에 나의랭킹 페이지만들기</p>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ranking;

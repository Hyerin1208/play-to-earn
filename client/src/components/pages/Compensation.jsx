import React, { useState, useEffect } from "react";
import axios from "axios";

import "./compensation.css";

const Compensation = ({ setShowModal, match }) => {
  const [point, setPoint] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/snake`)
      .then((response) => {
        setPoint(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  // const id = match.params.id;
  // console.log("id :: ", id);

  // // 데이터를 호출해 오는 동안 대기할 수 있도록 async, await 사용
  // useEffect(async () => {
  //   try {
  //     // `http://localhost:5000/snake` 라는 uri 로 DB를 불러온다.
  //     const res = await axios.get(`http://localhost:5000/snake`, {
  //       // param 으로 id 값을 넘겨준다.
  //       params: {
  //         id: id,
  //       },
  //     });
  //     // 받아온 데이터를 useState 를 이용하여 선언한다.
  //     setPoint(res.data[1].point);
  //   } catch (e) {
  //     console.error(e.message);
  //   }
  // }, []);

  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h2 className="text-center text-light">Weekly Bonus</h2>
        <div className="reward__content glow">
          <div className="single__rewardBlank">
            <h3>
              <i className="ri-vip-diamond-fill"></i>1등 : &nbsp;
              {point}
            </h3>
          </div>
          <div className="single__rewardBlank">
            <h3>
              <i className="ri-vip-diamond-fill"></i>2등
            </h3>
          </div>
          <div className="single__rewardBlank">
            <h3>
              <i className="ri-vip-diamond-fill"></i>3등
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compensation;

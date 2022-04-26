import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useSelector } from "react-redux";
import axios from "axios";
import ReactLoaing from "react-loading";

import "./contact.css";

import CommonSection from "../../ui/templete/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [Loading, setLoading] = useState(true);
  const account = useSelector((state) => state.AppState.account);
  const form = useRef();
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  let Navi = useNavigate();

  useEffect(async () => {
    await axios
      .post(`http://localhost:5000/user/contact`, {
        address: account,
      })
      .then((res) => {
        const data = res.data;
        setLoading(false);
        if (account === null) {
          alert("로그인 후 이용해주세요");
          Navi("/");
        } else if (data === null) {
          alert("회원가입 후 이용해주세요");
          Navi("/");
        } else if (data !== null) {
          setNick(data.nick);
          setEmail(data.email);
        } else return true;
      });
  }, [account]);

  const sendEmail = async (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_60z2szf",
        "template_49s2xef",
        form.current,
        "xstaV77PgHjXLwiCc"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    alert("문의가 접수 완료되었습니다.");
    Navi("/contact");
  };

  if (Loading) {
    return (
      <div>
        잠시만 기다려 주세요
        <ReactLoaing type={"bars"} color={"purple"} height={375} width={375} />
      </div>
    );
  } else {
    return (
      <>
        <CommonSection title="Contact" />

        <div className="contact__box">
          <Container>
            <Row>
              <Col lg="6" md="6" className="drop__box">
                <h2>Drop a Message</h2>
                <p>
                  Official Channel : Join to Follow Naming Center Latest News!
                </p>
                <div className="contact">
                  <form ref={form} onSubmit={sendEmail}>
                    <div className="form__input">
                      <input
                        type="text"
                        placeholder={nick}
                        value={nick}
                        name="user_name"
                        readOnly
                      />
                    </div>
                    <div className="form__input">
                      <input
                        type="email"
                        placeholder={email}
                        value={email}
                        name="user_email"
                        readOnly
                      />
                    </div>
                    <div className="form__input">
                      <input
                        type="text"
                        placeholder="Descript subject"
                        name="user_subject"
                      />
                    </div>
                    <div className="form__input">
                      <textarea
                        row="7"
                        placeholder="Write message"
                        name="user_message"
                      ></textarea>
                    </div>

                    <button className="send__btn">Send a Message</button>
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
};

export default Contact;

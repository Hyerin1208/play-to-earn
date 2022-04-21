import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useSelector } from "react-redux";

import "./contact.css";

import CommonSection from "../../ui/templete/CommonSection";
import { Container, Row, Col } from "reactstrap";

const Contact = () => {
  // const nameRef = useRef("");
  // const emailRef = useRef("");
  // const subjectRef = useRef("");
  // const messageRef = useRef("");
  const form = useRef();

  const sendEmail = (e) => {
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
  };

  return (
    <>
      <CommonSection title="Contact" />
      <div className="contact__box">
        <Container>
          <Row>
            <Col lg="6" md="6" className="drop__box">
              <h2>Drop a Message</h2>
              <p>
                Official Channel : Join to Follow 프로젝트 작명소 Latest News!
              </p>
              <div className="contact">
                <form ref={form} onSubmit={sendEmail}>
                  <div className="form__input">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      name="user_name"
                    />
                  </div>
                  <div className="form__input">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      name="user_email"
                    />
                  </div>
                  <div className="form__input">
                    <input
                      type="text"
                      placeholder="Enter subject"
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
};

export default Contact;

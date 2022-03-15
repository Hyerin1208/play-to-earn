import React, { useRef } from "react";

import "./contact.css";

import CommonSection from "../ui/CommonSection";
import { Container, Row, Col } from "reactstrap";

const Contact = () => {
    const nameRef = useRef("");
    const emailRef = useRef("");
    const subjectRef = useRef("");
    const messageRef = useRef("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <CommonSection title="Contact" />
            <div className="contact__box">
                <Container>
                    <Row>
                        <Col lg="6" md="6" className="drop__box">
                            <h2>Drop a Message</h2>
                            <p>Official Channel : Join to Follow 프로젝트 작명소 Latest News!</p>
                            <div className="contact">
                                <form onSubmit={handleSubmit}>
                                    <div className="form__input">
                                        <input type="text" placeholder="Enter your name" ref={nameRef} />
                                    </div>
                                    <div className="form__input">
                                        <input type="email" placeholder="Enter your email" ref={emailRef} />
                                    </div>
                                    <div className="form__input">
                                        <input type="text" placeholder="Enter subject" ref={subjectRef} />
                                    </div>
                                    <div className="form__input">
                                        <textarea row="7" placeholder="Write message" ref={messageRef}></textarea>
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

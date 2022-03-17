import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "reactstrap";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPickMessage] = useState(null);

  const dispatch = useDispatch();

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  // const userUpdate = useSelector((state) => state.userUpdate);
  // const { loading, error, success } = userUpdate;

  const postDetails = (pics) => {
    if (!pics) {
      return setPickMessage("Please Select an NFT");
    }
    setPickMessage(null);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "roadsidecoder");
      fetch("", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPickMessage("Please Select an Image");
    }
  };

  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   dispatch(updateProfile({ name, email, password, pic }));
  // };

  return (
    <div className="Profile__container">
      <h2>EDIT PROFILE</h2>
      <div className="profile__box">
        <Row className="profileContainer">
          <Col md={6}>
            <Form>
              <Form.Group constrolId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group constrolId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group constrolId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group constrolId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form>
            {/* {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )} */}
            <Form.Group constrolId="pic">
              <Form.Label>Change Profile Picture</Form.Label>
              <Form.File
                onChange={(e) => postDetails(e.target.file[0])}
                id="custom-file"
                type="image/png"
                label="upload Profile Picture"
                custom
              />
            </Form.Group>
            <Button type="submit" varient="primary">
              Update
            </Button>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default EditProfile;

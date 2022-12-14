import { Button, Form, Container, Row, Col, Image } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Status from "./Status.js";

const Register = () => {
  const authFetch = axios.create({
    baseURL: "api/v1/user",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(18);
  const [batch, setBatch] = useState(1);
  const [month, setMonth] = useState(1);
  const [showStatus, setShowStatus] = useState(false);
  const [status, setStatus] = useState("");

  const Month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const batches = ["6AM to 7AM", "7AM to 8AM", "8AM to 9AM", "5PM to 6PM"];

  async function ShowingStatus() {
    setShowStatus(true);
    setTimeout(() => {
      setShowStatus(false);
    }, 3000);
  }

  async function postUser(e) {
    e.preventDefault();
    try {
      const response = await authFetch.post("/register", {
        email,
        name,
        age,
        batch,
        month,
      });
      // console.log(response);
      setStatus("User Registered Successfully");
      ShowingStatus();
    } catch (error) {
      setStatus(
        error.response.data.msg ? error.response.data.msg : error.response.data
      );
      ShowingStatus();
    }
  }

  return (
    <>
      <div
        style={{ height: "100vh", backgroundColor: "#60e8fc" }}
        className="d-flex justify-content-center"
      >
        <Container
          className="m-auto"
          style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "10px",
          }}
        >
          {showStatus && <Status message={status} />}
          <Row>
            <Col>
              <Form onSubmit={postUser}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    required
                    type="name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAge">
                  <Form.Label>Age : </Form.Label>
                  <Form.Text
                    style={{
                      marginLeft: "10px",
                      fontSize: "20px",
                      color: "black",
                    }}
                  >
                    {age}
                  </Form.Text>
                  <Form.Range
                    min={18}
                    max={65}
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                    className="text-muted"
                  ></Form.Range>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBatch">
                  <Form.Label>Batch</Form.Label>
                  <Form.Select
                    id="Batch"
                    onChange={(e) =>
                      setBatch(batches.indexOf(e.target.value) + 1)
                    }
                  >
                    {batches.map((batch, key) => (
                      <option key={key}>{batch}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="Payment">
                  <Form.Label>Pay ₹500 for</Form.Label>
                  <Form.Select
                    id="Batch"
                    onChange={(e) => {
                      setMonth(Month.indexOf(e.target.value.split(" ")[3]) + 1);
                    }}
                  >
                    <option>
                      Current month : {Month[new Date().getMonth()]}{" "}
                    </option>
                    <option>
                      Next month :{" "}
                      {Month[(new Date().getMonth() + 1) % Month.length]}{" "}
                    </option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Pay and Register
                </Button>
              </Form>
            </Col>

            <Col className="d-flex justify-content-center d-none d-lg-block">
              <Image
                // style={{ overflow: "revert" }}
                src={require("../image/front_image.png")}
                alt="Yoga_image"
                fluid
                width={"500px"}
              />
            </Col>
          </Row>
          <p
            className="d-flex justify-content-center mb-0"
            style={{ color: "black", marginTop: "15px" }}
          >
            Already A member :&nbsp;
            <Link to={"/"} className="link-info text-decoration-none">
              Check Subscription
            </Link>
          </p>
        </Container>
      </div>
    </>
  );
};

export default Register;

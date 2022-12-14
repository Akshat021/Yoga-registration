import axios from "axios";
import { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import UserData from "./components/UserData";
import { Link } from "react-router-dom";

const Landing = () => {
  const [email, setEmail] = useState("");
  const [data, setData] = useState({});
  const [option, setOption] = useState(-1);
  const authFetch = axios.create({
    baseURL: "api/v1/user",
  });

  async function checkDetails(e) {
    e.preventDefault();
    try {
      const response = await authFetch.post("/details", {
        email,
      });

      if (response.status === 200) {
        const { name, email, age, batch, month } = response.data;

        setOption(0);
        setData({ name, email, age, batch, month });
        // console.log(new Date().getMonth(), month);
        if (
          new Date().getMonth() + 1 != month &&
          (new Date().getMonth() + 2) % 12 != month
        ) {
          setOption(1);
          //   delete user. also delete before register if month is expired
          return;
        }
      }
    } catch (error) {
      setOption(2);
    }
  }

  return (
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
        <h1
          style={{ fontFamily: "'Dosis', 'sans-serif'", textAlign: "center" }}
        >
          Already A Member
        </h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="h3" style={{ fontFamily: "sans-serif" }}>
              Email
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email to check Batch Number"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="success"
            type="submit"
            style={{
              width: "120px",
              fontSize: "20px",
              backgroundColor: "#03fcec",
              color: "black",
              border: "none",
            }}
            onClick={checkDetails}
          >
            Submit
          </Button>
        </Form>

        <div
          className="d-flex justify-content-center"
          style={{ fontFamily: "sans-serif", textAlign: "center" }}
        >
          {option === 0 && <UserData data={data} />}
          {option === 1 && <h3>Subscription Expired. Kindly Register Again</h3>}
          {option === 2 && <h3>Member Not Exist. Kindly Register</h3>}
        </div>

        <p
          className="d-flex justify-content-center"
          style={{ color: "black", marginTop: "15px" }}
        >
          Not A member :&nbsp;
          <Link to={"/register"} className="link-info text-decoration-none">
            Register
          </Link>
        </p>
      </Container>
    </div>
  );
};
export default Landing;

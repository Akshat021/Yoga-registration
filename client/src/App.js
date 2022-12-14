import "./App.css";
import Register from "./components/Register";
import Landing from "./Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>

      {/* <div
        className="m-auto"
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "10px",
        }}
      >
        

      </div> */}

      {/* <div
        style={{ height: "100vh", backgroundColor: "#60e8fc" }}
        className="d-flex justify-content-center"
      >
        <Register />
      </div> */}
    </>
  );
}
export default App;

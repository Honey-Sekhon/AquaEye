import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LoginForm from "./Components/Assets/LoginSignup/Login";
import LoginForm from "./Components/LoginSignup/Login"
import SignUpForm from "./Components/LoginSignup/SignUp";
import Dash from "./Components/Dashboard/dash";
import Camera from "./Components/camera"
// import Sidebar from "./Components/Dashboard/sidebar";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/dashboard" element={<Dash />} />
          <Route path="/camera-link" element={<Camera />} />
          {/* <Route path="/dashboard" element={<Sidebar />} /> */}
          {/* other routes */}
        </Routes>
      </Router>
    </>
  );
}

export default App;

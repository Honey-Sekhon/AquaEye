import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LoginForm from "./Components/Assets/LoginSignup/Login";
import LoginForm from "./Components/LoginSignup/Login"
import SignUpForm from "./Components/LoginSignup/SignUp";
import Dash from "./Components/Dashboard/dash";
// import Sidebar from "./Components/Dashboard/sidebar";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/dashboard" element={<Dash />} />
          {/* <Route path="/dashboard" element={<Sidebar />} /> */}
          {/* other routes */}
        </Routes>
      </Router>
    </>
  );
}

export default App;

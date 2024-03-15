import ListGroup from "./Components/ListGroup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/Assets/LoginSignup/Login";
import SignUpForm from "./Components/Assets/LoginSignup/SignUp";

function App() {
  return (
    <>
      {/* <LoginForm /> */}
      {/* <SignUpForm /> */}
      {/* <ListGroup /> */}

      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          {/* other routes */}
        </Routes>
      </Router>
    </>
  );
}

export default App;

import ListGroup from "./Components/ListGroup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/Assets/LoginSignup/Login";
import SignUpForm from "./Components/Assets/LoginSignup/SignUp";
import AthleteHomePage from "./Components/Assets/HomePage/AthleteHomaPage";
import CoachHomePage from "./Components/Assets/HomePage/CoachHomePage";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/coach-home" element={<CoachHomePage />} />
          <Route path="/athlete-home" element={<AthleteHomePage />} />
          {/* other routes */}
        </Routes>
      </Router>
    </>
  );
}

export default App;

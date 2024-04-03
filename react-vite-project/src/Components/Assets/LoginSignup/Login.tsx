import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { useUser } from "./UserContext"; // Import the useUser hook

const LoginForm: React.FC = () => {
  const [loginField, setLoginField] = useState(""); // Renamed from login to loginField
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login: loginUser } = useUser(); // Rename destructured login to loginUser

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: loginField, password }), // Use loginField here
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Store the token
        loginUser(data); // Use loginUser here to update the context
        if (data.userType === "athlete") {
          navigate("/athlete-home");
        } else if (data.userType === "coach") {
          navigate("/coach-home");
        }
      } else {
        throw new Error(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed with error: " + error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6 align-self-center">
          <div className="border p-4">
            <h2>Login</h2>
            <p>
              Doesn't have an account yet? <a href="/signup">Sign Up</a>
            </p>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="loginField">Email or Username</Label>
                <Input
                  type="text"
                  name="loginField" // Updated to match the state variable name
                  id="loginField" // It's good practice for the id to match the name attribute
                  placeholder="you@example.com or your username"
                  value={loginField} // Referencing the updated state variable
                  onChange={(e) => setLoginField(e.target.value)} // Using setLoginField to update the state
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter 6 characters or more"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <FormText>
                  <a href="/forgot-password">Forgot Password?</a>
                </FormText>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </Label>
              </FormGroup>
              <Button color="primary" className="mt-3 w-100">
                LOGIN
              </Button>
            </Form>
            <div className="text-center my-3">or login with</div>
            <div className="d-flex justify-content-center">
              <Button color="secondary" className="btn-google me-2">
                <span className="me-2">Google</span>
              </Button>
              <Button color="secondary" className="btn-facebook ms-2">
                <span className="me-2 text-center">Facebook</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="col-md-6">{/* Placeholder for the image */}</div>
      </div>
    </div>
  );
};

export default LoginForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful", data);
        console.log("User type:", data.userType);
        if (data.userType === "athlete") {
          console.log("Navigating to athlete home");
          navigate("/athlete-home");
        } else if (data.userType === "coach") {
          console.log("Navigating to coach home");
          navigate("/coach-home");
        } else {
          console.log("User type not recognized:", data.userType);
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
                <Label for="emailAddress">Email Address</Label>
                <Input
                  type="email"
                  name="email"
                  id="emailAddress"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter 6 character or more"
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState(""); // State for username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState(""); // State to hold the user type selection

  const navigate = useNavigate(); // For redirecting after signup

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!userType) {
      alert("Please select a user type.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, userType }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful", data);
        navigate("/login"); // Redirect to the login page on successful signup
      } else if (response.status === 409) {
        alert("Username or Email already in use. Please use a different one.");
      } else {
        throw new Error(data.error || "Failed to sign up");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred while signing up. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">{/* Placeholder for the image */}</div>
        <div className="col-md-6">
          <div className="border p-4">
            <h2>Sign Up</h2>
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Your unique username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FormGroup>
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
                  placeholder="Enter 6 characters or more"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="userTypeSelect">I am a:</Label>
                <Input
                  type="select"
                  name="userType"
                  id="userTypeSelect"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  required
                >
                  <option value="">Select your role</option>
                  <option value="athlete">Athlete</option>
                  <option value="coach">Coach</option>
                </Input>
              </FormGroup>
              <Button color="primary" className="mt-3 w-100">
                SIGN UP
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

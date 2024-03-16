import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate(); // For redirecting after signup.

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Signup logic
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful", data);
        // Redirect user to login page or dashboard page after successful signup
        navigate("/login"); // this is redirecting to the login page.
      } else if (response.status === 409) {
        alert("Email already in use. Please use a different email.");
      } else {
        throw new Error(data.error || "Failed to sign up");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert(error); // Display the error message to the user
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

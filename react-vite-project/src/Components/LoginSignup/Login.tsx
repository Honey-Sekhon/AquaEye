import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import "../CSS/LoginForm.css"; // Ensure the path is correct
import homePageImage from "../Images/HomePage.png"; // Ensure the path is correct

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Replace with actual logic
    window.location.href = "/dashboard"; // Replace with the actual user page route
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${homePageImage})` }}>
      <div className="title-container">
        <h1 style={{ fontSize: '5rem', fontWeight: 'bold', color: '#002244' }}>AQUA POLO</h1>
        <h2 style={{ fontSize: '3rem', color: '#003366' }}>Dive Into Victory</h2>
      </div>
      <div className="login-box">
        <h2>Login to Your Account</h2>
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
          <Button color="primary" className="mt-3 w-100">LOGIN</Button>
        </Form>
        <br />
        <div className="social-login">
          <Button color="danger" className="social-button" style={{ marginRight: '10px' }}>Google</Button>
          <Button color="primary" className="social-button">Facebook</Button>
        </div>
        <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

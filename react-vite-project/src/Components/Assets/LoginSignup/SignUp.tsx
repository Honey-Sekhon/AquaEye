import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle your sign-up logic here
    console.log('Sign Up with:', email, password, confirmPassword);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          {/* Placeholder for the image */}
        </div>
        <div className="col-md-6">
          <div className="border p-4">
            <h2>Sign Up</h2>
            <p>Already have an account? <a href="/login">Login</a></p>
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
              <Button color="primary" className="mt-3 w-100">SIGN UP</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

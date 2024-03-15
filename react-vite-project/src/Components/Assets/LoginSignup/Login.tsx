import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle your login logic here
    console.log('Login with:', email, password, rememberMe);
  };

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6 align-self-center">
          <div className="border p-4">
            <h2>Login</h2>
            <p>Doesn't have an account yet? <a href="/signup">Sign Up</a></p>
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
                <FormText><a href="/forgot-password">Forgot Password?</a></FormText>
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
        <div className="col-md-6">
          {/* Placeholder for the image */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
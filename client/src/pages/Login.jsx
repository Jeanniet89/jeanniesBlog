import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  const { setFormData } = useState('');

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  return (
    <div>
      <Container>
        <h1>Welcome Back Sweetheart!!</h1>
        <Form style={{ width: 350 }}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Text className="text-muted">
            We'll never share your email.
          </Form.Text>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="d-flex justify-content-center">
            <Button type="submit" as={Link} to="/">
              <span>Sign In</span>
            </Button>
          </Form.Group>
        </Form>
        <Link className="mt-2" to="/signup">
          Create an Account
        </Link>
      </Container>
    </div>
  );
};

export default Login;

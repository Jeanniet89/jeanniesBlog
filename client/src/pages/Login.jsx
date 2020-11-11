import React, { useState, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const Login = ({history}) => {
 const { setCurrentWriter } = useContext(AppContext);
  const [formData, setFormData] = useState(null);
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  	const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/writers/login', formData);
        setCurrentWriter(response.data);
        sessionStorage.setItem('writer', response.data);
        history.push('/');
      } catch (error) {
        console.log('Login Error: ', error);
      }
    };

  return (
    <div>
      <Container className="container d-flex flex-column align-items-center justify-content-center fullscreen">
        <h1 className="mb-4">Welcome Back!!</h1>
        <Form style={{ width: 350 }} onSubmit={handleLogin}>
          <Form.Group controlId="email">
            <Form.Label htmlFor="email">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Text className="text-muted">
            We'll never share your email.
          </Form.Text>
          <Form.Group controlId="password">
            <Form.Label htmlFor="password">Password</Form.Label>
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
        <Link className="mt-2" to="/register">
          Need an Account? Register Here!
        </Link>
      </Container>
    </div>
  );
};

export default Login;

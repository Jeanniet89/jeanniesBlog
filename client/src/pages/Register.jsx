import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { AppContext } from '../context/AppContext';


const Register = ({history}) => {
    const { setCurrentWriter } = useContext(AppContext);
  const [formData, setFormData] = useState(null);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('/writers/register', formData);
    sessionStorage.setItem('writers', response.data);
    setCurrentWriter(response.data.writer);
    history.push('/writers');
  } catch (error) {
    console.log('Register Error: ', error);
  }
};

  return (
    <>
      <Container className="container d-flex flex-column align-items-center justify-content-center fullscreen">
        <h2 className="mb-4">Welcome!</h2>
        <Form style={{ width: 300 }} onSubmit={handleRegister}>
          <Form.Group controlId="fullName">
            <Form.Label htmlFor="fullName">Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Full Name"
              name="name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label htmlFor="email">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="d-flex justify-content-center">
            <Button id="button" variant="dark" type="submit" block>
              Create Account
            </Button>
          </Form.Group>
        </Form>
        <Link className="mt-2" to="/writers/login">
          Already a member? Login.
        </Link>
      </Container>
    </>
  );
};

export default Register;

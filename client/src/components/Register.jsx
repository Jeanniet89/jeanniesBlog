import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const Register = ({history}) => {
  const [ formData, setFormData ] = useState('');
  const { setWriter } = useContext(AppContext);
  
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('/writers/new', formData)
      .then((response) => {
        sessionStorage.setItem('writer', response.data);
        setWriter(response.data);
        history.push('/home');
      })
     .catch((error) => console.log(error));
  };

  return (
    <>
      <Container className="signupcontainer container d-flex flex-column align-items-center justify-content-center fullscreen">
        <h2 className="title mb-2 text-left">Welcome!</h2>
        <Form style={{ width: 300 }} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="fullName">Full Name</Form.Label>
            <Form.Control
              id="fullName"
              type="text"
              placeholder="Full Name"
              name="name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="email">Email Address</Form.Label>
            <Form.Control
              id="email"
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              id="password"
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
        <Link className="mt-2" to="/login">
          Already a member? Login.
        </Link>
      </Container>
    </>
  );
};

export default Register;

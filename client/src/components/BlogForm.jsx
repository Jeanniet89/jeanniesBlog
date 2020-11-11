import React, { useState, useContext } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const BlogForm = () => {
  const [blogs, setBlogs] = useState('');
  const { setLoading } = useContext(AppContext);

  const handleChange = (e) => {
    setBlogs({ ...blogs, [e.target.name]: e.target.blog });
  };

  const handleSubmit = async (e) => {
    const form = e.target;
    setLoading(true);
    e.preventDefault();
    try {
      await axios({
        method: 'POST',
        url: '/posts/new',
        withCredentials: true,
        data: blogs,
      });
      setBlogs(null);
      setLoading(false);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Article Title"
            name="title"
            required={true}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCreatedAt">
          <Form.Label>Date Created</Form.Label>
          <Form.Control
            type="date"
            placeholder="Date Created"
            name="createdAt"
            required={true}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicArticle">
          <Form.Label>Article</Form.Label>
          <Form.Control
            type="textarea"
            rows="5"
            placeholder="Text for your Blog..."
            name="Article"
            required={true}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicAuthorName">
          <Form.Label>Author Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Author Name"
            name="authorname"
            required={true}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default BlogForm;

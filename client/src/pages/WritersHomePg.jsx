import React from 'react';
import { Container, Table } from 'react-bootstrap';
import WritersNav from '../components/WritersNav';
import BlogForm from '../components/BlogForm';

const WritersHomePg = () => {
  return (
    <div>
      <WritersNav />
      <h1>Writers Home Page!!</h1>
      <Container>
        <Table>
          <tbody>
            <BlogForm />
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default WritersHomePg;
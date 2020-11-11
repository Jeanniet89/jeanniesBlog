import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import moment from 'moment';
import DeletedBlog from './DeletedBlog';
import { AppContext } from '../context/AppContext';

const Blog = ({ history }) => {
  const [postData, setPostData] = useState({});
  const { currentWriter } = useContext(AppContext);

  const handleDelete = () => {
    axios.delete(`/posts/:id`, { withCredentials: true });
    history.push('/posts');
  };

  useEffect(() => {
    axios.get(`/posts/:id`).then((res) => {
      setPostData(res.data);
    });
  }, []);

  return (
    <>
      <Container>
        {postData.map((posts) => (
          <tr key={postData._id}>
            <td>
              {postData.title ? (
                <strike>{postData.title}</strike>
              ) : (
                postData.title
              )}
            </td>
            <td>
              {postData.createdAt
                ? moment(postData.createdAt).format('MMM Do, YYYY')
                : 'Date Created'}
            </td>
            <td>
              {postData.article ? (
                <strike>{postData.article}</strike>
              ) : (
                postData.article
              )}
            </td>
            <td>
              {postData.authorname ? (
                <strike>{postData.authorname}</strike>
              ) : (
                postData.authorname
              )}
            </td>
            <td>{/* ...pending UPDATE logic */}</td>
            <td>
              <DeletedBlog id={postData._id} />
            </td>
          </tr>
        ))}
        ;
      </Container>
      <div style={{ marginLeft: '2rem', marginTop: '2rem' }}>
        {currentWriter && currentWriter._id === postData._id ? (
          <>
            <Button onClick={() => handleDelete()}>Delete</Button>
            <Button onClick={() => history.push(`/posts/:id`)}>Edit</Button>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default Blog;

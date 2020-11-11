import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import BlogList from '../components/BlogList';
import AppNavbar from '../components/AppNavbar';

const HomePage = ({history}) => {
    return (
      <div>
        <AppNavbar history={history} />
        <Jumbotron>
          <div className="">
            <h1> JEANNIE'S BLOG!!!</h1>
            <h4>
              <br />
              Feel free to leave your comments, thoughts, desires...
              <br />
              Well, you get the point.
            </h4>
          </div>
        </Jumbotron>
        <BlogList />
        <Button className="mt-2 mr-2" onClick={() => history.push('/posts/new')}>
          Create Post
        </Button>
        <Button className="mt-2 ml-2" onClick={() => history.push('/posts')}>
          View Posts
        </Button>
      </div>
    );
}

export default HomePage;

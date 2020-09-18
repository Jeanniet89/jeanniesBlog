import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import PostList from '../components/PostList';


const HomePage = () => {
    return (
      <div>
        <Jumbotron>
          <div className="">
            <h1>Jeannie's Simple Blog!</h1>
            <h4>
              WELCOME!!!
              <br />
              Feel free to leave your comments, thoughts, desires...
              <br />
              Well you get the point..
            </h4>
          </div>
        </Jumbotron>
        <PostList />
      </div>
    );
}

export default HomePage;

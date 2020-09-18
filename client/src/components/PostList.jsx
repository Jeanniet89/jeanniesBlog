import React from 'react';
import axios from 'axios';
import PublishBlogs from './PublishBlogs'

class PostList extends React.Component {
  state = {
    posts: [],
  };
  componentDidMount() {
    this.getPosts();
  }

  async getPosts() {
    const res = await axios.get('http://localhost:8080/posts/');
    this.setState({ posts: res.data });
  }
  renderDate(dateString) {
    const monthNames = ['September'];

    const date = new Date(dateString);

    return `${
      monthNames[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }

  renderList() {
    return this.state.posts.map((posts) => {
      return <PublishBlogs keyt={posts} />
    });
  }

  render() {
    return <div>{this.renderList()}</div>;
  }
}
export default PostList;

import React from 'react';
import axios from 'axios';

class Blog extends React.Component {
	state = {
		post: {}
	}
	componentDidMount() {
		this.getPost();
	}
	async getPost() {
		const res = await axios.get(
			`http://localhost:8080/posts/${this.props.match.params.id}`
		);
		this.setState({ post: res.data });
	}
	renderPost() {
		return <div text={this.state.post.text}></div>;
	}

	render() {
		return <div>{this.renderPost()}</div>;
	}
}

export default Blog;
